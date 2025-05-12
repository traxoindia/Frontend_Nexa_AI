import React from "react";
import { useNavigate } from "react-router-dom";

function NavigateButton() {
  const navigate = useNavigate();

  return (
    <button
      type="button"
      className="button"
      onClick={() => navigate("/listen-ai")}
    >
      GET STARTED
    </button>
  );
}

export default NavigateButton;
