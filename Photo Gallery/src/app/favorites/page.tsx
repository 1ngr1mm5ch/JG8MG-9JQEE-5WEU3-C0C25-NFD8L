'use client'
import { useEffect, useState } from "react";
import Image from 'next/image'
import styles from "./page.module.scss";

export default function Favorites() {
    const [data, setData] = useState<any[]>([]);
    const [favorites, setFavorite] = useState<Number[]>([]);
    const [selectedItem, setSelectedItem] = useState<number>(0);

    //helper function to convert the data from the localstorage to use it
    const getFavorites = () => {
        const storedArrayString = localStorage.getItem('favorites');
        if (storedArrayString !== null) {
            const storedArray: number[] = JSON.parse(storedArrayString);
            console.log('Gespeicherter Array:', favorites);
            return storedArray;
        } 
    }
    
  
  //fetching the data from the API and trying to filtered it with the values from the localstorage  
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch('https://kitsu.io/api/edge/anime');
        const jsonData = await response.json();

        // let array: any[] = getFavorites ;

        // const filteredArray = jsonData.data.filter( (item: { id: unknown; }) => array.includes(item.id as number));
        // const filteredArray = jsonData.data.filter( (item: { id: unknown; }) => getFavorites.includes(item.id));

        setData(jsonData.data);
        // setData(filteredArray);
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


  //removing the items from the localstorage and the favorites
  const removeFromFavorite = (id: number) => {
    let array = favorites;
    if(favorites.includes(id)){
      array = favorites.filter((value) => value !== id);
      setFavorite(array)
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
                          <button onClick={()=> removeFromFavorite(item.id)} className={styles.addFavorite}>Remove from Favorites</button>
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
  