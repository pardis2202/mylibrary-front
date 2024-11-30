const Contact = () => {
    return (
      <div className="flex flex-col  justify-center items-center p-6 bg-gray-100 min-h-screen">
      <h1 className="text-3xl font-bold text-green-500 mb-4">Contact Us</h1>
      <p className="mt-3 italic">Get in touch with us at Contact@Onlinelibrary.com.</p>
      <form className="mt-6 w-full max-w-md">
        <input
          type="text"
          placeholder="Your Name"
          className="mb-3 px-4 py-2 w-full border rounded focus:outline-none"
        />
        <input
          type="email"
          placeholder="Your Email"
          className="mb-3 px-4 py-2 w-full border rounded focus:outline-none"
        />
        <textarea
          placeholder="Your Message"
          className="mb-3 px-4 py-2 w-full border rounded focus:outline-none"
          rows="4"
        />
        <button className="px-4 py-2 bg-green-500 text-white rounded hover:bg-green-600">
          Submit
        </button>
      </form>
    </div>

    );
  };
  
  export default Contact;