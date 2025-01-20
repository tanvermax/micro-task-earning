import React from "react";
import { useNavigate } from "react-router-dom";

const CoinPackages = () => {
  const navigate = useNavigate();
  const packages = [
    { coins: 10, price: 1 },
    { coins: 150, price: 10 },
    { coins: 500, price: 20 },
    { coins: 1000, price: 35 },
  ];

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
      {packages.map((pkg, index) => (
        <div
          key={index}
          className="p-4 border rounded shadow-md text-center cursor-pointer"
          onClick={() => navigate(`/purchase/${pkg.coins}/${pkg.price}`)}
        >
          <h3 className="text-2xl font-bold">{pkg.coins} Coins</h3>
          <p className="text-xl text-gray-600">= ${pkg.price}</p>
        </div>
      ))}
    </div>
  );
};

export default CoinPackages;
