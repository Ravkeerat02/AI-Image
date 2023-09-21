import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

import { preview } from "../assets";
import { getRandomPrompt } from "../utils";
import { FormField, Loader } from "../components";

const CreatePost = () => {
  // allows for navigation - jumping between pages
  const navigate = useNavigate();
  const [form, setForm] = useState({
    name: "",
    prompt: "",
    photo: "",
  });

  const [generatingImg, setGeneratingImg] = useState(false);
  const [loading, setLoading] = useState(false);
  // takes care of submission
  const handleSubmit = () => {};
  // takes care of form changes
  const handleChange = (e) => {};
  // takes care of suprise me button
  const handleSupriseMe = () => {};

  return (
    <section className="max-w-7xl mx-auto">
      <div>
        <h1 className="font-extrabold text-[#222328] text-[32px]">Create</h1>
        <p className="mt-2 text-[#666e75] text-[14px] max-w-[500px]">
          Create images with the power of DALL-E AI
        </p>
      </div>
      {/* form  */}
      <form className="mt-16 max-w-3xl" onSubmit={handleSubmit}>
        {/* position fields */}
        <div className="flex flex-col gap-5">
          <FormField
            labelName="Your name"
            name="name"
            type="text"
            placeholde="John Doe"
            value={form.name}
            handleChange={handleChange}
          />
          <FormField
            labelName="Prompt"
            name="prompt"
            type="text"
            placeholde="A modern, sleek Cadillac drives along the Gardiner expressway with downtown Toronto in the background, with a lens flare, 50mm photography"
            value={form.prompt}
            handleChange={handleChange}
            isSupriseMe
            handleSupriseMe={handleSupriseMe}
          />
          {/* will display the picture as per needed */}
          <div className="relative bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 w-64 p-3 h-64 flex justify-center items-center ">
            {form.photo ? (
              <img
                src={form.photo}
                alt={form.preview}
                className="w-full h-full object-contain"
              />
            ) : (
              <img
                src={preview}
                alt="preview"
                className="w-9/12 h-9/12 object-contain opacity-40"
              />
            )}
          </div>
        </div>
      </form>
    </section>
  );
};

export default CreatePost;
