export function getIsoString() {
  return new Date().toISOString();
}

export function embellishCreate<T>(
  data: T
): T & { createdAt: string; updatedAt: string; isActive: boolean } {
  return {
    createdAt: getIsoString(),
    updatedAt: getIsoString(),
    ...data,
    isActive: true
  };
}

export function embellishUpdate<T>(data: T) {
  delete (data as any)._id;
  return {
    ...data,
    updatedAt: getIsoString()
  };
}

export function embellishDelete<T>(data: T) {
  return {
    ...data,
    isActive: false,
    deletedAt: getIsoString()
  };
}
