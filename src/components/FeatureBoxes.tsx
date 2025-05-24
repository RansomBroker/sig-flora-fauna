
import React from 'react';
import { 
  Card, 
  CardContent
} from './ui/card';

const FeatureBoxes = () => {
  const features = [
    {
      title: "Menggambarkan bahan pembelajaran berupa video, kuis dan alat evaluasi dalam bentuk try out",
      icon: "📚",
      width: "col-span-1",
    },
    {
      title: "Menampilkan persebaran flora dan fauna berdasarkan wilayah atau karakteristik daerah",
      icon: "🗺️",
      width: "col-span-1",
    },
    {
      title: "Menampilkan tipe habitat atau Gambaran geografis, flora dan fauna dan jenis dalam hal ini adalah kelompok taksonomi",
      icon: "🌍",
      width: "col-span-1",
    },
    {
      title: "Menampilkan icon visual dari flora dan fauna",
      icon: "🦋",
      width: "col-span-1",
    }
  ];
  
  return (
    <div className="mt-12 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
      {features.map((feature, index) => (
        <Card 
          key={index} 
          className={`glass-effect bg-gradient-to-br from-white via-transparent to-${index % 2 === 0 ? 'cyan' : 'blue'}-50/30 rounded-xl ${feature.width}`}
        >
          <CardContent className="flex flex-col items-center p-5">
            <div className="text-3xl mb-3 pulse-slow">{feature.icon}</div>
            <p className="text-sm font-medium text-center bg-clip-text text-transparent bg-gradient-to-r from-primary to-secondary">{feature.title}</p>
          </CardContent>
        </Card>
      ))}
    </div>
  );
};

export default FeatureBoxes;
