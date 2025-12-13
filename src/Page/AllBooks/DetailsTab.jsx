import { useState } from "react";

// Tabs Component
const DetailsTab = ({ book }) => {
  const [activeTab, setActiveTab] = useState("description");

  return (
    <>
      <div className="tabs tabs-boxed">
        <button
          className={`tab ${activeTab === "description" && "tab-active"}`}
          onClick={() => setActiveTab("description")}
        >
          Description
        </button>
        <button
          className={`tab ${activeTab === "custom" && "tab-active"}`}
          onClick={() => setActiveTab("custom")}
        >
          Custom Field 1
        </button>
        <button
          className={`tab ${activeTab === "reviews" && "tab-active"}`}
          onClick={() => setActiveTab("reviews")}
        >
          Reviews
        </button>
      </div>

      <div className="p-6">
        {activeTab === "description" && (
          <p className="text-gray-700">{book.description}</p>
        )}

        {activeTab === "custom" && (
          <p className="text-gray-700">Custom Field Content goes here...</p>
        )}

        {activeTab === "reviews" && (
          <div className="space-y-6">
            {book.reviews?.length ? (
              book.reviews.map((review, idx) => (
                <div key={idx} className="flex gap-4">
                  <img
                    src={review.avatar}
                    alt={review.name}
                    className="w-12 h-12 rounded-full"
                  />
                  <div>
                    <h4 className="font-semibold">{review.name}</h4>
                    <div className="flex items-center gap-2 text-yellow-400">
                      {[...Array(review.rating)].map((_, i) => (
                        <FaStar key={i} />
                      ))}
                    </div>
                    <p className="text-gray-500 text-sm">{review.date}</p>
                    <p>{review.message}</p>
                  </div>
                </div>
              ))
            ) : (
              <p>No reviews yet.</p>
            )}
          </div>
        )}
      </div>
    </>
  );
};
export default DetailsTab;
