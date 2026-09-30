import {useState} from 'react';

function TaskCard({ title }){
    const [isChecked, setIsChecked] = useState(false);

    return (
    <div style={{ border: "1px solid #ccc", padding: "8px", margin: "4px 0" }}>
      <label>
        <input 
          type="checkbox" 
          checked={isChecked} 
          onChange={(e) => setIsChecked(e.target.checked)} 
        />
        {title}
      </label>
    </div>
  );
}

export default TaskCard;