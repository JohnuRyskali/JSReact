import {useState} from 'react';

export default function App2() {
    const [items, setItems] = useState([
        { id: 1, title: 'Banana' },
        { id: 2, title: 'Apple' },
        { id: 3, title: 'Pear' },
    ]);

    const[search, setSearch] = useState("");
    const[isReversed, setIsReversed] = useState(false);

    const filteredItems = items.filter(item => item.title.toLowerCase().includes(search.toLowerCase()));

    const displayedItems = isReversed ? [...filteredItems].reverse() : filteredItems;

    const handleSearchChange = (e) => {
        setSearch(e.target.value);
        console.log('Search input changed:', e.target.value);
    }

    const handleSortToggle = () => {
        setIsReversed(!isReversed);
        console.log('Sort order toggled. Now reversed:', !isReversed);
    }

    return (
        <div>
            <input 
                type="text"
                placeholder="Search..."
                value={search}
                onChange={handleSearchChange}
            />
            <button onClick={handleSortToggle}>
                {isReversed ? 'Sort Ascending' : 'Sort Descending'}
            </button>
        
        <ul>
            {displayedItems.map((item) => (
                <li key={item.id}>{item.title}</li>
            ))}
        </ul>
        </div>
    );
}