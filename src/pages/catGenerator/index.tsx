import React from 'react';
import Card, {Characteristic} from '../../components/Card';
import styles from './styles.module.scss';

const nameGenerator = () => (Math.random() + 1).toString(36).substring(7);

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
  const luckRandomizer = getRandomizer(0, 15);
  const wisdomRandomizer = getRandomizer(1, 15);
  const intelligenceRandomizer = getRandomizer(0, 10);
  const strengthRandomizer = getRandomizer(1, 5);
  const charismaRandomizer = getRandomizer(0, 15);
  const amountRandomizer = getRandomizer(1, 5);
  
  return (
    <div className={styles['card-container']}>
      {
        Array(amount).fill(1).map(() => {
          const name = nameGenerator();
          const luck = luckRandomizer() - 5;
          const agility = agilityRandomizer();
          const armor = armorRandomizer() + (luck * 0.6);
          const strength = strengthRandomizer() + (agility * 0.2) + (luck * 0.2);
          const attack = strength * agility + luck;
          
          const characteristic: Characteristic = {
            name,
            health: healthRandomizer(),
            amount: amountRandomizer(),
            attack,
            agility,
            luck,
            strength,
            armor,
            charisma: (charismaRandomizer() - 10) * (luck * 0.2),
            speed: speedRandomizer() - (armor * 0.4) + (agility * 0.2),
            wisdom: wisdomRandomizer(),
            intelligence: intelligenceRandomizer(),
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
