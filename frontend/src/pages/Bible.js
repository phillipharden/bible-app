import React, { useState, useEffect } from "react";
import "../css/Bible.css";
import TranslationSelector from "../components/ReadNow";

function Bible() {

  return (
    <>
      <h1>Bible</h1>
      <TranslationSelector />
    </>
  );
}

export default Bible;
