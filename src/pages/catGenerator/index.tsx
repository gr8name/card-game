import {nameByRace} from 'fantasy-name-generator';
import React from 'react';
import Card, {Characteristic} from '../../components/Card';
import styles from './styles.module.scss';

// const nameGenerator = () => (Math.random() + 1).toString(36).substring(7);

function getRandomizer(bottom: number, top: number) {
  return function () {
    return Math.floor(Math.random() * (1 + top - bottom)) + bottom;
  }
}

type Props = {
  amount?: number;
  onCardSelect?: (card: Characteristic) => void
}

function CatGenerator({ amount = 6, onCardSelect }: Props) {
  const healthRandomizer = getRandomizer(10, 20);
  const speedRandomizer = getRandomizer(5,10);
  const agilityRandomizer = getRandomizer(1, 5);
  const armorRandomizer = getRandomizer(0, 15);
  const luckRandomizer = getRandomizer(0, 5);
  const wisdomRandomizer = getRandomizer(1, 15);
  const intelligenceRandomizer = getRandomizer(0, 10);
  const strengthRandomizer = getRandomizer(1, 5);
  const charismaRandomizer = getRandomizer(0, 10);
  const amountRandomizer = getRandomizer(2, 5);
  
  return (
    <div className={styles['card-container']}>
      {
        Array(amount).fill(1).map(() => {
          const name = nameByRace("elf", {gender: "female"}) as string;
          const luck = luckRandomizer() - 2;
          const agility = agilityRandomizer();
          const armor = armorRandomizer() ;
          const strength = strengthRandomizer()  + (luck * 0.2);
          const attack = ((strength * agility) * 0.4)+ luck;
          
          const characteristic: Characteristic = {
            name,
            health: healthRandomizer(),
            amount: amountRandomizer(),
            attack: attack > 0.1 ? attack : 0.6,
            agility,
            luck,
            strength,
            armor,
            charisma: (charismaRandomizer() - 10) * (luck * 0.2),
            speed: speedRandomizer() - (armor * 0.4) + (agility * 0.2),
            wisdom: wisdomRandomizer(),
            intelligence: intelligenceRandomizer(),
            movePoint: 0
          }
          
          return (
            <div key={name}>
              <Card {...characteristic}/>
              <button onClick={() => onCardSelect && onCardSelect(characteristic)}> Select </button>
            </div>
          );
        })
      }
    </div>
  );
}

export default CatGenerator;
