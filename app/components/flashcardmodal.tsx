'use client';

import { useEffect, useState } from "react";
import {
  collection,
  addDoc,
  getDocs,
  deleteDoc,
  updateDoc,
  doc,
} from "firebase/firestore";
import { db } from "../../lib/firebase";
import {
  FaTrash,
  FaEdit,
  FaBook,
  FaPlus,
  FaTimes,
} from "react-icons/fa";

export default function FlashcardModal() {
  const [isOpen, setIsOpen] = useState(false);
  const [question, setQuestion] = useState("");
  const [answer, setAnswer] = useState("");
  const [flashcards, setFlashcards] = useState<any[]>([]);
  const [editingId, setEditingId] = useState<string | null>(null);
  const [reviewMode, setReviewMode] = useState(false);
  const [shuffledCards, setShuffledCards] = useState<any[]>([]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [showAnswer, setShowAnswer] = useState(false);

  // Fetch flashcards from Firestore
  const fetchFlashcards = async () => {
    const querySnapshot = await getDocs(collection(db, "flashcards"));
    const cards: any[] = [];
    querySnapshot.forEach((doc) => {
      cards.push({ id: doc.id, ...doc.data() });
    });
    setFlashcards(cards);
  };

  useEffect(() => {
    if (isOpen) {
      fetchFlashcards();
    }
  }, [isOpen]);

  const handleAddOrUpdate = async () => {
    if (!question || !answer) return;

    if (editingId) {
      const ref = doc(db, "flashcards", editingId);
      await updateDoc(ref, { question, answer });
      setEditingId(null);
    } else {
      await addDoc(collection(db, "flashcards"), { question, answer });
    }

    setQuestion("");
    setAnswer("");
    fetchFlashcards(); // Re-fetch updated list
  };

  const handleDelete = async (id: string) => {
    await deleteDoc(doc(db, "flashcards", id));
    fetchFlashcards();
  };

  const handleEdit = (card: any) => {
    setQuestion(card.question);
    setAnswer(card.answer);
    setEditingId(card.id);
  };

  const handleStartReview = () => {
    const shuffled = [...flashcards].sort(() => Math.random() - 0.5);
    setShuffledCards(shuffled);
    setCurrentIndex(0);
    setReviewMode(true);
    setShowAnswer(false);
  };

  const handleNextCard = () => {
    if (currentIndex < shuffledCards.length - 1) {
      setCurrentIndex(currentIndex + 1);
      setShowAnswer(false);
    } else {
      alert("End of flashcards!");
      setReviewMode(false);
      setShowAnswer(false);
    }
  };

  return (
    <div>
      <button
        onClick={() => setIsOpen(true)}
        className="bg-blue-600 text-white px-4 py-2 rounded-md shadow-md flex items-center gap-2"
      >
        <FaBook /> Flashcards
      </button>

      {isOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-40 z-50 flex items-center justify-center">
          <div className="bg-white p-6 rounded-xl max-w-2xl w-full relative overflow-y-auto max-h-[90vh]">
            <button
              onClick={() => {
                setIsOpen(false);
                setReviewMode(false);
              }}
              className="absolute top-4 right-4 text-red-600"
            >
              <FaTimes size={20} />
            </button>

            <h2 className="text-2xl font-semibold text-center mb-4">
              Flashcards
            </h2>

            {/* Add/Edit Form */}
            <div className="space-y-3 mb-6">
              <input
                type="text"
                placeholder="Question"
                className="w-full px-4 py-2 border rounded"
                value={question}
                onChange={(e) => setQuestion(e.target.value)}
              />
              <input
                type="text"
                placeholder="Answer"
                className="w-full px-4 py-2 border rounded"
                value={answer}
                onChange={(e) => setAnswer(e.target.value)}
              />
              <button
                onClick={handleAddOrUpdate}
                className="bg-green-600 text-white px-4 py-2 rounded flex items-center gap-2"
              >
                <FaPlus />
                {editingId ? "Update" : "Add"} Flashcard
              </button>
            </div>

            {/* Flashcard List */}
            {!reviewMode && (
              <>
                <h3 className="text-xl font-bold mb-2">All Flashcards</h3>
                <ul className="space-y-3">
                  {flashcards.map((card) => (
                    <li
                      key={card.id}
                      className="border p-4 rounded flex justify-between items-start bg-gray-50"
                    >
                      <div>
                        <p className="font-semibold text-gray-800">
                          Q: {card.question}
                        </p>
                        <p className="text-gray-600">A: {card.answer}</p>
                      </div>
                      <div className="flex gap-2 ml-4">
                        <button
                          onClick={() => handleEdit(card)}
                          className="text-blue-600"
                        >
                          <FaEdit />
                        </button>
                        <button
                          onClick={() => handleDelete(card.id)}
                          className="text-red-600"
                        >
                          <FaTrash />
                        </button>
                      </div>
                    </li>
                  ))}
                </ul>

                {/* Start Review Button */}
                {flashcards.length > 0 && (
                  <div className="mt-6 text-center">
                    <button
                      onClick={handleStartReview}
                      className="bg-purple-600 text-white px-4 py-2 rounded"
                    >
                      Start Reviewing
                    </button>
                  </div>
                )}
              </>
            )}

            {/* Review Mode */}
            {reviewMode && shuffledCards.length > 0 && (
              <div className="mt-6 text-center">
                <div
                  onClick={() => setShowAnswer(true)}
                  className="mb-4 p-6 rounded bg-yellow-100 text-yellow-900 cursor-pointer hover:bg-yellow-200 transition"
                >
                  <strong>Question:</strong>{" "}
                  {shuffledCards[currentIndex]?.question}
                  {!showAnswer && (
                    <p className="text-sm italic text-gray-600">
                      (click to show answer)
                    </p>
                  )}
                </div>

                {showAnswer && (
                  <div className="mb-4 p-4 rounded bg-green-100 text-green-900">
                    <strong>Answer:</strong>{" "}
                    {shuffledCards[currentIndex]?.answer}
                  </div>
                )}

                <button
                  onClick={handleNextCard}
                  className="bg-purple-600 text-white px-4 py-2 rounded"
                >
                  Next
                </button>
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
}
