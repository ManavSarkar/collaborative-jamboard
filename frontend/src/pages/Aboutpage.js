import React from "react";

const CreatorInfo = ({ name, githubProfile }) => {
  return (
    <div className="mb-4">
      <h3 className="text-xl font-semibold">{name}</h3>
      <a
        href={`https://github.com/${githubProfile}`}
        target="_blank"
        rel="noopener noreferrer"
        className="text-blue-600 hover:underline"
      >
        {githubProfile}
      </a>
    </div>
  );
};

const AboutPage = () => {
  return (
    <div className="py-8 px-4 max-w-lg mx-auto">
      <h1 className="text-3xl font-semibold mb-6">About Us</h1>
      <div className="mb-6">
        <p className="mb-2">
          We are a team of creators who collaborated on a project called
          "Collaborative Jamboard". Under the guidance of Professor Tuhina
          Samanta at IIEST Shibpur, we brought this project to life.
        </p>
        <p className="mb-2">
          The Collaborative Jamboard is an interactive web application that
          allows multiple users to collaborate on a virtual whiteboard in
          real-time. It provides various drawing tools and features for a
          seamless collaborative experience.
        </p>
        <p className="mb-2">
          You can find the source code for the backend on GitHub:
        </p>
        <a
          href="https://github.com/ManavSarkar/collaborative-jamboard"
          target="_blank"
          rel="noopener noreferrer"
          className="text-blue-600 hover:underline mb-4 inline-block"
        >
          Backend Code
        </a>
        <p className="mb-2">And the frontend code on GitHub:</p>
        <a
          href="https://github.com/ManavSarkar/collaborative-jamboard-frontend"
          target="_blank"
          rel="noopener noreferrer"
          className="text-blue-600 hover:underline mb-4 inline-block"
        >
          Frontend Code
        </a>
      </div>
      <div>
        <h2 className="text-2xl font-semibold mb-4">Meet the Creators:</h2>
        <CreatorInfo name="Manav Sarkar" githubProfile="manavsarkar" />
        <CreatorInfo name="Sabarna Bhowmik" githubProfile="sabarnait24" />
        <CreatorInfo name="Tanmay Mahato" githubProfile="TMahato" />
      </div>
    </div>
  );
};

export default AboutPage;
