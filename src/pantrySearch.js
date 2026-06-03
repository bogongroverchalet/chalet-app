// Synonym groups for pantry search expansion.
// Any query matching a term in a group also returns results for the other terms.
const SYNONYM_GROUPS = [
  ['pasta', 'spaghetti', 'lasagna', 'noodles', 'penne', 'spirals', 'fettuccine', 'linguine'],
  ['rice', 'basmati', 'jasmine', 'long grain', 'medium grain', 'cous cous', 'couscous'],
  ['flour', 'self raising', 'plain flour', 'wholemeal flour', 'cornflour', 'corn flour', 'bread mix', 'binders'],
  ['oil', 'canola', 'olive oil', 'sesame oil', 'coconut oil', 'ghee', 'copha', 'nuttelex', 'margarine'],
  ['milk', 'skim', 'full cream', 'lactose free', 'almond milk', 'oat milk', 'soy milk', 'rice milk', 'powdered milk'],
  ['beans', 'lentils', 'chickpeas', 'kidney beans', 'borlotti', 'cannellini', 'butter beans', 'legumes', 'dried peas'],
  ['tuna', 'fish', 'salmon', 'sardines', 'seafood'],
  ['soup', 'broth', 'stock', 'minestrone', 'chicken noodle'],
  ['bread', 'loaf', 'wholegrain', 'wholemeal bread', 'white bread', 'multigrain'],
  ['jam', 'marmalade', 'honey', 'vegemite', 'peanut butter', 'spread', 'golden syrup'],
  ['chocolate', 'cocoa', 'milo', 'drinking chocolate', 'choc'],
  ['coffee', 'decaf', 'instant coffee', 'espresso', 'cafe'],
  ['tea', 'herbal', 'green tea', 'black tea', 'chai'],
  ['curry', 'paste', 'masala', 'garam masala', 'korma', 'tikka'],
  ['sugar', 'castor', 'icing sugar', 'brown sugar', 'stevia', 'sweetener'],
  ['cake', 'cake mix', 'baking powder', 'baking soda', 'bicarb'],
  ['biscuit', 'cracker', 'wafer', 'cookie', 'savoy', 'vita wheat', 'salada'],
  ['tomato', 'passata', 'tomato paste', 'tomato sauce', 'crushed tomato', 'tinned tomato'],
  ['chicken', 'poultry', 'tinned chicken'],
  ['beef', 'steak', 'corned beef', 'braised'],
  ['veg', 'vegetable', 'tinned veg', 'vegetables'],
  ['cereal', 'muesli', 'oats', 'weetbix', 'cornflakes', 'rice bubbles', 'rolled oats'],
  ['vinegar', 'balsamic', 'white vinegar', 'apple cider'],
  ['egg', 'eggs', 'egg powder', 'egg substitute'],
  ['cheese', 'parmesan', 'tasty cheese', 'cheddar', 'dairy'],
  ['sauce', 'soy sauce', 'bbq', 'tomato sauce', 'worcestershire', 'oyster sauce'],
  ['spice', 'spices', 'herbs', 'seasoning', 'bay leaves', 'cumin', 'paprika', 'coriander', 'turmeric'],
  ['corn', 'corn kernels', 'creamed corn', 'baby corn', 'cornflour', 'popcorn'],
  ['mushroom', 'champignons', 'straw mushrooms', 'dried mushrooms'],
  ['fruit', 'peaches', 'apricots', 'pears', 'fruit salad', 'pineapple', 'dried fruit'],
  ['nut', 'nuts', 'almonds', 'peanuts', 'walnuts', 'peanut butter'],
  ['gluten free', 'gf', 'celiac', 'coeliac'],
  ['vegan', 'plant based', 'tvp', 'nutmeat', 'nutritional yeast'],
  ['fodmap', 'onion replacer', 'garlic replacer'],
]

// Build flat lookup: lowercased term → group of terms
const termToGroup = new Map()
for (const group of SYNONYM_GROUPS) {
  for (const term of group) {
    termToGroup.set(term.toLowerCase(), group)
  }
}

// Returns all search terms to use (original query + synonyms if a match is found)
export function expandQuery(query) {
  const q = query.toLowerCase().trim()
  if (!q) return [query]

  // Exact match on a synonym term
  if (termToGroup.has(q)) return termToGroup.get(q)

  // Partial match: query is contained in a synonym term or vice versa
  for (const [term, group] of termToGroup) {
    if (term.length >= 3 && q.length >= 3 && (term.startsWith(q) || q.startsWith(term))) {
      return group
    }
  }

  return [query]
}

// Run a Fuse search with synonym expansion, deduplicating by refIndex.
export function fuseSearch(fuse, query) {
  const terms = expandQuery(query)
  const seen = new Set()
  const results = []
  for (const term of terms) {
    for (const r of fuse.search(term)) {
      if (!seen.has(r.refIndex)) {
        seen.add(r.refIndex)
        results.push(r.item)
      }
    }
  }
  return results
}
