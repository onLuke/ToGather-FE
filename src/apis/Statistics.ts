import Api from './Api';

export const getStatistics = async (weeks: number | '') => {
  return await Api.get(`/techStackStatistics/${weeks}`);
  /*   return await Api.get(`http://125.132.114.181:8080/techStackStatistics/${weeks}`); */
};
