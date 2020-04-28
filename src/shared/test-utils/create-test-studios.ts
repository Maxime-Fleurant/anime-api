import { Studio } from '../../studios/studios.entity';

export const createStudio = (id: number, name: string): Studio => {
  const newStudio = new Studio();

  newStudio.id = id;
  newStudio.name = name;

  return newStudio;
};
