import React, { useEffect, useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faHeart, faTimes } from "@fortawesome/free-solid-svg-icons";
import "../App.css";
import API from "../api/axiosConfig";
import { jwtDecode } from "jwt-decode";
import EquipmentDetailModal from "../components/EquipmentDetailModal";

const EquipmentSwipe = ({ equipmentList = [] }) => {
  const [selectedEquipment, setSelectedEquipment] = useState(null);

  useEffect(() => {
    if (!equipmentList || equipmentList.length === 0) return;

    const tinderContainer = document.querySelector(".tinder");
    const nope = document.getElementById("nope");
    const love = document.getElementById("love");

    function initCards() {
      const allCards = document.querySelectorAll(".tinder--card:not(.removed)");
      allCards.forEach((card, index) => {
        card.style.zIndex = allCards.length - index;
        card.style.transform = `scale(${(20 - index) / 20}) translateY(-${
          30 * index
        }px)`;
        card.style.opacity = (10 - index) / 10;
      });

      tinderContainer?.classList.add("loaded");
    }

    const handleAddToPreference = async (equipmentId) => {
      try {
        const token = localStorage.getItem("jwtToken");
        if (!token) throw new Error("Token mancante");
        const decoded = jwtDecode(token);
        const userId = decoded.id;

        await API.post(`/preference`, null, {
          params: { userId, equipmentId },
        });

        console.log("✅ Aggiunto ai preferiti", equipmentId);
      } catch (err) {
        console.error("❌ Errore aggiunta preferiti", err);
      }
    };

    function createButtonListener(love) {
      return function () {
        const cards = document.querySelectorAll(".tinder--card:not(.removed)");
        if (!cards.length) return;

        const card = cards[0];
        const equipmentId = card.getAttribute("data-equipment-id");
        card.classList.add("removed");

        const moveOutWidth = document.body.clientWidth * 1.5;

        card.style.transform = love
          ? `translate(${moveOutWidth}px, -100px) rotate(-30deg)`
          : `translate(-${moveOutWidth}px, -100px) rotate(30deg)`;

        if (love && equipmentId) {
          handleAddToPreference(equipmentId);
        }

        setTimeout(() => initCards(), 300);
      };
    }

    const allCards = document.querySelectorAll(".tinder--card");

    allCards.forEach((el) => {
      let offsetX = 0;
      let offsetY = 0;
      let isDragging = false;

      el.addEventListener("mousedown", (e) => {
        isDragging = true;
        offsetX = e.clientX;
        offsetY = e.clientY;
        el.classList.add("moving");
      });

      document.addEventListener("mousemove", (e) => {
        if (!isDragging) return;
        const dx = e.clientX - offsetX;
        const dy = e.clientY - offsetY;
        el.style.transform = `translate(${dx}px, ${dy}px) rotate(${
          dx * dy * 0.001
        }deg)`;
      });

      document.addEventListener("mouseup", () => {
        if (!isDragging) return;
        isDragging = false;
        el.classList.remove("moving");
        el.classList.add("removed");
        initCards();
      });
    });

    nope?.addEventListener("click", createButtonListener(false));
    love?.addEventListener("click", createButtonListener(true));

    setTimeout(() => initCards(), 50);

    return () => {
      nope?.removeEventListener("click", createButtonListener(false));
      love?.removeEventListener("click", createButtonListener(true));
    };
  }, [equipmentList]);

  return (
    <div className="tinder">
      <div className="tinder--cards">
        {equipmentList.map((equipment) => (
          <div
            className="tinder--card"
            key={equipment.id}
            data-equipment-id={equipment.id}
          >
            <img
              src={equipment.imagePaths?.[0] || "https://placehold.co/600x300"}
              alt={equipment.name}
            />
            <h3>{equipment.name}</h3>
            <p>{equipment.description}</p>
            <button
              className="btn btn-outline-primary mt-3"
              onClick={() => setSelectedEquipment(equipment)}
            >
              Dettagli
            </button>
          </div>
        ))}
      </div>

      <div className="tinder--buttons">
        <button id="nope">
          <FontAwesomeIcon icon={faTimes} />
        </button>
        <button id="love">
          <FontAwesomeIcon icon={faHeart} />
        </button>
      </div>

      {selectedEquipment && (
        <EquipmentDetailModal
          equipment={selectedEquipment}
          onClose={() => setSelectedEquipment(null)}
        />
      )}
    </div>
  );
};

export default EquipmentSwipe;
