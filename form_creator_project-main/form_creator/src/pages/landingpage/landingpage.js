import React from "react";
import { Link } from "react-router-dom";
import "./landingpage.css";

const LandingPage = () => {
  return (
    <div className="landing-page">
      <header className="landing-header">
        <h1>Bienvenue sur Msit-Forms</h1>
        <p>
          Découvrez notre solution complète pour la gestion des clients, des contacts,
          des rendez-vous, et des devis. Simplifiez vos processus avec notre plateforme
          intuitive et efficace.
        </p>
        <div className="landing-buttons">
          <Link to="/login" className="btn btn-primary">Se connecter</Link>
          <Link to="/register" className="btn btn-secondary">Créer un compte</Link>
        </div>
      </header>
      <section className="landing-content">
        <div className="landing-text">
          <h2>Notre Mission</h2>
          <p>
            Chez Msit-Forms, notre mission est de vous offrir un outil puissant
            pour gérer tous vos besoins en matière de gestion de clients, de contacts,
            de rendez-vous et de devis. Notre plateforme vous permet de créer et
            gérer des formulaires en toute simplicité, tout en assurant une interface
            utilisateur moderne et intuitive.
          </p>
        </div>
      </section>
    </div>
  );
};

export default LandingPage;
