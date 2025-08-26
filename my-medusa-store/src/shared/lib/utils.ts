"use client";

export const cleanObject = (obj: any) => {
  const newObj = {};
  for (const key in obj) {
    if (obj[key] !== null && obj[key] !== undefined) {
      newObj[key] = obj[key];
    }
  }
  return newObj;
};

// В вашем файле с хелперами

// Упрощенный и исправленный хелпер
export const createQueryParams = ({
  query,
  relations,
}: {
  query: Record<string, any>;
  relations?: Record<string, any>;
}) => {
  // Сначала объединяем все параметры в один обычный объект,
  // а затем создаем URLSearchParams.
  const combinedParams = {
    ...cleanObject(query),
    ...relations,
  };
  console.log("output_log: COMBINED_PARAMS =>>>", combinedParams);

  return new URLSearchParams(combinedParams);
};
