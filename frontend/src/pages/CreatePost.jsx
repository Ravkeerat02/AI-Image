import  { useState } from "react";
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

  // hnandles image submission - stores the backedn
  const genrateImage = async () => {
    if (form.prompt) {
      try {
        setGeneratingImg(true);
        const response = await fetch("http://localhost:8080/api/v1/dalle", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ prompt: form.prompt }), // Include the prompt in the request body
        });

        // Handle the response from the server as needed
        const data = await response.json();
        setForm({ ...form, photo: `data:image/jpeg;base64,${data.photo}` });
      } catch (error) {
        alert(error);
      } finally {
        setGeneratingImg(false);
      }
    } else {
      alert("Please enter a prompt");
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (form.prompt && form.photo) {
      setLoading(true);

      try {
        const response = await fetch(`http://localhost:8080/api/v1/posts`, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(form),
        });

        // Assuming you want to parse the response as JSON
        const responseData = await response.json();

        // Handle the response data if needed
        console.log("Form submission response:", responseData);

        // Navigate to the home page after successful submission
        navigate("/");
      } catch (error) {
        console.error("Error submitting form:", error);
        alert("An error occurred while submitting the form.");
      } finally {
        setLoading(false);
      }
    } else {
      alert("Please provide a prompt and a photo.");
    }
  };
  // akes care of form changes
  const handleChange = (e) => {
    // updating name with teh value
    setForm({ ...form, [e.target.name]: e.target.value });
  };
  // takes care of suprise me button
  const handleSupriseMe = () => {
    // getting a random prompt
    const randomPrompt = getRandomPrompt(form.prompt);
    // updating the form
    setForm({ ...form, prompt: randomPrompt });
  };

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
            {generatingImg && (
              <div className="aboslute inset-0 z-0 flex justify-center items-center bg-[rgba(0,0,0,0.5)] rounded-lg">
                <Loader />
              </div>
            )}
          </div>
        </div>
        <div className="mt-5 flex gap-5">
          <button
            type="btn"
            onClick={genrateImage}
            className=" text-white bg-green-700 font-medium rounded-md text-sm w-full sm:w-auto px-5 py-2.5 text-center"
          >
            {genrateImage ? "Generating..." : "Generate..."}
          </button>
        </div>
        <div className="mt-10 ">
          <p className="mt-2 text-[#666e75] text-[14px]">
            You can share the image with the community
          </p>
          <button
            type="submit"
            className="mt-3 text-white bg-[#6469ff] font-medium rounded-md text-sm w-full sm:w-auto px-5 py-2.5 text-center"
          >
            {loading ? "Sharing" : "Share with the comminity"}
          </button>
        </div>
      </form>
    </section>
  );
};

export default CreatePost;
