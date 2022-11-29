import Grid from '@mui/material/Unstable_Grid2';
import {nameByRace} from 'fantasy-name-generator';
import {NPCs} from "fantasy-content-generator";
import React from 'react';
import Card, {Characteristic} from '../../components/Card';

// const nameGenerator = () => (Math.random() + 1).toString(36).substring(7);

function getRandomizer(bottom: number, top: number) {
  return function () {
    return Math.floor(Math.random() * (1 + top - bottom)) + bottom;
  }
}

type Props = {
  amount?: number;
  race?: string;
  onCardSelect?: (card: Characteristic) => void;
  columns?: number;
}

function getRaceBonuses(race: string): Partial<Characteristic> {
  const amount = race === 'cavePerson' ? 2 : 0;
  const armor = race === 'dwarf' ? 2 : 0;
  const agility = race === 'halfling' ? 2 : 0;
  const wisdom = race === 'gnome' ? 2 : 0;
  const speed = race === 'elf' ? 2 : 0;
  const mana = race === 'highfairy' ? 2 : 0;


  return {
    amount,
    armor,
    agility,
    wisdom,
    speed,
    mana
  };
}

function CatGenerator({amount = 6, onCardSelect, race = 'elf', columns = 4}: Props) {
  const genderRandomizer = getRandomizer(0, 1);
  const healthRandomizer = getRandomizer(20, 50);
  const manaRandomizer = getRandomizer(10, 20);
  const speedRandomizer = getRandomizer(5, 10);
  const agilityRandomizer = getRandomizer(1, 10);
  const armorRandomizer = getRandomizer(1, 15);
  const luckRandomizer = getRandomizer(0, 7);
  const wisdomRandomizer = getRandomizer(1, 15);
  const intelligenceRandomizer = getRandomizer(0, 10);
  const strengthRandomizer = getRandomizer(1, 5);
  const charismaRandomizer = getRandomizer(0, 10);
  const amountRandomizer = getRandomizer(2, 5);

  return (
    <Grid container spacing={2}>
      {
        Array(amount).fill(1).map(() => {
          const {traits, desires} = NPCs.generate();

          const name = nameByRace(race, {gender: genderRandomizer() ? 'female' : 'male'}) as string;
          const luck = luckRandomizer() - 2;
          const health = healthRandomizer();
          const agility = agilityRandomizer();
          const armor = armorRandomizer();
          const mana = manaRandomizer();
          const strength = strengthRandomizer() + (luck * 0.2);
          const attack = ((strength * agility) * 0.4) + luck;
          const speed = speedRandomizer();
          const wisdom = wisdomRandomizer();
          const intelligence = intelligenceRandomizer();
          const charisma = charismaRandomizer();
          const amount = amountRandomizer();
          const balanser = agility + health + armor + mana + strength + attack + speed + luck + wisdom + intelligence + charisma + amount
          const raceBonus: Partial<Characteristic> = getRaceBonuses(race);

          const characteristic: Characteristic = {
            name,
            race,
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
            movePoint: 0,
            raceBonus,
            traits,
            desires,
            mana,
            balanser
          }

          return (
            <Grid xs={columns} key={name}>
              <Card {...characteristic} onLikeClick={() => onCardSelect && onCardSelect(characteristic)} />
            </Grid>
          );
        })
      }
    </Grid>
  );
}

export default CatGenerator;
