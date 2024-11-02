import { useContext, useEffect, useState } from "react";
import { AppContext } from "../../context/AppContext";
import { fetchBudget, updateBudget } from "../../utils/budget-utils";

const Budget = () => {
  const { budget, setBudget } = useContext(AppContext);
  const [newBudget, setNewBudget] = useState<number>(budget);

  useEffect(() => {
    const loadBudget = async () => {
      try {
        const budgetAmount = await fetchBudget();
        setBudget(budgetAmount);
      } catch (error) {
        console.error('Failed to load budget:', error);
      }
    };

    loadBudget();
  }, [setBudget]);  // Only include setBudget in dependencies

  const handleUpdateBudget = async () => {
    try {
      const updatedBudget = await updateBudget(newBudget);
      setBudget(updatedBudget);
    } catch (error) {
      console.error('Failed to update budget:', error);
    }
  };

  return (
    <div className="alert alert-secondary">
      <span>Budget: ${budget}</span>
      <div>
        <input
          type="number"
          value={newBudget}
          onChange={(e) => setNewBudget(Number(e.target.value))}
          placeholder="Enter new budget"
        />
        <button onClick={handleUpdateBudget}>Update Budget</button>
      </div>
    </div>
  );
};

export default Budget;