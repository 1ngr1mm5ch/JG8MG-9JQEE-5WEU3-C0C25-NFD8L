'use client'
import Image from 'next/image'
import styles from "./page.module.scss";
import { useEffect, useState } from "react";


export default function Home() {
  const [data, setData] = useState<any[]>([]);
  const [favorites, setFavorite] = useState<Number[]>([]);
  const [selectedItem, setSelectedItem] = useState<number>(0);


  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch('https://kitsu.io/api/edge/anime');
        const jsonData = await response.json();
        setData(jsonData.data);
        console.log(jsonData.data)
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };
    
    fetchData();
  }, []);

  const openOverlay = (id: number) => {
    if(id !== selectedItem) {
      setSelectedItem(id);
    }
    
    
  }

  const closeOverlay = (id:number) => {
    setSelectedItem(selectedItem-id);
  }

  const addToFavorite = (id: number) => {
    let array = favorites;
    if(favorites.includes(id)){
      array = favorites.filter((value) => value !== id);
      setFavorite(array)
      localStorage.setItem('favorites', JSON.stringify(array))
    } else {
      array = [...array, id]
      setFavorite(array);
      localStorage.setItem('favorites', JSON.stringify(array))
    }
    
    
  }

  return (
    <>
      {data && data.length > 0 ? (
        <div className={styles.posterGallery}>
          {data.map((item: any) => (
            <div key={item.id} className={styles.posterImageContainer} onClick={() => openOverlay(item.id)}>
              <Image
                src={item.attributes.posterImage.original}
                alt={item.attributes.canonicalTitle}
                sizes='70vw'
                fill
                style={{
                  objectFit: 'cover',
                }}
              ></Image>
              {selectedItem === item.id && (
                <div className={styles.overlay} onClick={(e)=>e.stopPropagation}>
                  <button onClick={()=> closeOverlay(item.id)} className={styles.closeOverlay}>X</button>
                  <div className={styles.information}>
                    <div>{item.attributes.canonicalTitle}</div>
                    <div>{item.attributes.ratingRank}</div>
                  </div>
                  <div>
                    <button onClick={()=> addToFavorite(item.id)} className={styles.addFavorite}>Add to Favorites</button>
                  </div>
                </div>
              )}
            </div>
          ))}
        </div>
      ) : (
        <p>Loading...</p>
      )}
    </>
  );
}
