import React from 'react';
import {useNavigate} from 'react-router-dom';
import Card from '../../components/Card/Card';
import styles from './styles.module.scss'

const nameGenerator = () => (Math.random() + 1).toString(36).substring(7);

function getRandomizer(bottom: number, top: number) {
  return function () {
    return Math.floor(Math.random() * (1 + top - bottom)) + bottom;
  }
}

type Props = {
  amount?: number;
}

function CatGenerator({ amount = 6 }: Props) {
  let navigate = useNavigate();
  
  const healthRandomizer = getRandomizer(10, 20);
  const speedRandomizer = getRandomizer(5,10);
  const agilityRandomizer = getRandomizer(1, 5);
  const armorRandomizer = getRandomizer(0, 20);
  const luckRandomizer = getRandomizer(0, 20);
  const wisdomRandomizer = getRandomizer(1, 20);
  const intelligenceRandomizer = getRandomizer(0, 10);
  const strengthRandomizer = getRandomizer(1, 20);
  const charismaRandomizer = getRandomizer(0, 20);
  const amountRandomizer = getRandomizer(1, 5);
  
  return (
    <div className={styles['card-container']}>
      {
        Array(amount).fill(1).map(() => {
          const name = nameGenerator();
          const amount = amountRandomizer();
          const agility = agilityRandomizer();
          const luck = luckRandomizer() - 10;
          const charisma = (charismaRandomizer() - 10) * (luck * 0.2);
          const strength = strengthRandomizer() + (agility * 0.2) + (luck * 0.2);
          const armor = armorRandomizer() + (luck * 0.6);
          const speed = speedRandomizer() - (armor * 0.4) + (agility * 0.2);
          const wisdom = wisdomRandomizer();
          const intelligence = intelligenceRandomizer();
          
          return (
            <div key={name}>
              <Card
                name={name}
                amount={amount}
                health={healthRandomizer()}
                strength={strength}
                armor={armor}
                speed={speed}
                agility={agility}
                luck={luck}
                wisdom={wisdom}
                intelligence={intelligence}
                charisma={charisma}
              />
              <button onClick={() => navigate(`/random/${name}`)}> Select </button>
            </div>
          );
        })
      }
    </div>
  );
}

export default CatGenerator;
