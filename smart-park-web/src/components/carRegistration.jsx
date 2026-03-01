import { useState } from 'react';
import { useAuth0 } from '@auth0/auth0-react';
import { useSupabase } from '../hooks/useSupabase';

export const CarRegistration = () => {
  const { user } = useAuth0();
  const supabase = useSupabase();
  const [carModel, setCarModel] = useState('');
  const [licensePlate, setLicensePlate] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!supabase) return alert("Please log in first!");

    const { error } = await supabase
      .from('cars')
      .insert([{ 
        user_id: user.sub, 
        model: carModel,
        license_plate: licensePlate
      }]);

    if (error) alert("Error: " + error.message);
    else {
      alert("Car added successfully!");
      setCarModel('');
      setLicensePlate('');
    }
  };

  return (
    <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '10px', maxWidth: '300px' }}>
      <input 
        type="text" 
        placeholder="Enter Car Model" 
        value={carModel} 
        onChange={(e) => setCarModel(e.target.value)} 
        required
      />
      <input 
        type="text" 
        placeholder="Enter License Plate" 
        value={licensePlate} 
        onChange={(e) => setLicensePlate(e.target.value)} 
        required
      />
      <button type="submit">Save Car</button>
    </form>
  );
};
