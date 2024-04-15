export const getSort = (sort?: string): Record<string, string> | Record<string, Record<string, string>> => {
  switch (sort) {
    case 'price_low':
      return { price: 'asc' }
    case 'price_high':
      return { price: 'desc' }
    case 'newly_added':
      return { createdAt: 'desc' }
    case 'top_liked':
      return { likes: { _count: 'desc' } }
    default:
      return { createdAt: 'asc' }
  }
}

export const getPrice = (minPrice: string | null, maxPrice: string | null): Record<string, number> => {
  const min = minPrice ? parseFloat(minPrice) : null
  const max = maxPrice ? parseFloat(maxPrice) : null

  const price: Record<string, number> = {}

  if (min !== null) {
    price.gte = min
  }

  if (max !== null) {
    price.lte = max
  }

  return price
}

export const getCategory = (paramsCategory: string): string | undefined => {
  const decodedCategory = decodeURIComponent(paramsCategory);
  return decodedCategory && decodedCategory !== "search" ? decodedCategory : undefined;
}

