import React, { useState } from 'react';

const MaterialForm = () => {
    const [item, setItem] = useState('');
    const [description, setDescription] = useState('');
    const [rate, setRate] = useState(0);
    const [variationOptions, setVariationOptions] = useState<{ description: string, rate: number }[]>([]);
    const [variationDescription, setVariationDescription] = useState('');
    const [variationRate, setVariationRate] = useState(0);

    const handleAddVariation = () => {
        // Add a new variation option to the variationOptions array
        const newVariation = {
            description: variationDescription,
            rate: variationRate
        };
        setVariationOptions(prev => [...prev, newVariation]);

        // Clear the input fields for new variation
        setVariationDescription('');
        setVariationRate(0);
    };

    const handleSubmit = async () => {
        // Collect material data along with variationOptions
        const materialData = {
            item,
            description,
            rate,
            createdBy: 'user_01J95WN48Y4FQ59MVREFECE6VK', // Assuming user ID is already available
            variationOptions,
        };

        // Log the data to verify
        console.log('Material Data to Submit:', materialData);

        // Send to the backend (e.g., POST request)
        try {
            const response = await fetch('/api/material', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(materialData),
            });

            const data = await response.json();
            console.log('Response from API:', data);
        } catch (error) {
            console.error('Error:', error);
        }
    };

    return (
        <div>
            <h1>Create New Material</h1>
            <div>
                <label>Item</label>
                <input type="text" value={item} onChange={e => setItem(e.target.value)} />

                <label>Description</label>
                <input type="text" value={description} onChange={e => setDescription(e.target.value)} />

                <label>Rate</label>
                <input type="number" value={rate} onChange={e => setRate(parseFloat(e.target.value))} />

                <h3>Variation Options</h3>
                <label>Variation Description</label>
                <input
                    type="text"
                    value={variationDescription}
                    onChange={e => setVariationDescription(e.target.value)}
                />

                <label>Variation Rate</label>
                <input
                    type="number"
                    value={variationRate}
                    onChange={e => setVariationRate(parseFloat(e.target.value))}
                />

                <button onClick={handleAddVariation}>Add Variation</button>

                <h4>Added Variations</h4>
                <ul>
                    {variationOptions.map((option, idx) => (
                        <li key={idx}>
                            {option.description} - {option.rate}
                        </li>
                    ))}
                </ul>

                <button onClick={handleSubmit}>Save Material</button>
            </div>
        </div>
    );
};

export default MaterialForm;
