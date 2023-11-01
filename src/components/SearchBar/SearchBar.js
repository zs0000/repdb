import { useState } from 'react';
import { useRouter } from 'next/router';
import s from './SearchBar.module.css';
export function SearchBar() {
  const [type, setType] = useState('');
  const [term, setTerm] = useState('');
  const [genes, setGenes] = useState([]);
  const [snakeGenes, setSnakeGenes] = useState([
    "Pinstripe",
    "Pastel",
    "Fire",
    "Spider",
    "Mojave",
    "Lesser",
    "Phantom",
    "Enchi",
    "Yellow Belly",
    "Cinnamon",
    "Black Pastel",
    "Spotnose",
    "Banana",
    "Axanthic",
    "Clown",
    "Piebald",
    "GHI",
    "Coral Glow",
    "Super Pastel",
    "Super Stripe",
    "Bumblebee",
    "Butter",
    "Mystic",
    "Vanilla",
    "Champagne",
    "Ghost",
    "Woma",
    "Blade",
    "Special",
    "Specter",
    "Candino",
    "Pin",
    "Cypress",
    "Sugar",
    "Sable",
    "Hidden Gene Woma",
    "Mojave Ghost",
    "Orange Dream",
    "Ivory",
    "Firefly",
    "Spark",
    "Yellowbelly",
    "Gravel",])
  const [crestedGenes, setCrestedGenes] = useState(["Axanthic",
   "Bi-Color",
    "Black",
     "Black Base",
      "Blonde",
       "Blushing",
        "Bold Stripe Tigers",
         "Brindle",
          "Buckskin",
           "Bullseye",
            "Cappuccino",
             "Chevron",
              "Cluster Spots",
               "Cold Fusion",
                "Cream",
                 "Creamsicle",
                  "Crowned",
                   "Dalmatian",
                    "Dark",
                     "Drippy",
                      "Empty Back",
                       "Extreme Harlequin",
                        "Flame",
                         "Fringing",
                          "Furred",
                           "Halloween",
                            "Harlequin",
                             "Hypo",
                              "Ink Spot",
                               "Kneecaps",
                                "Lavender",
                                 "Lilly White",
                                  "Mocha",
                                   "Monochrome",
                                    "Normal",
                                     "Oil Spot",
                                      "Olive",
                                       "Orange",
                                        "Orange Patterning",
                                         "Orange Tip",
                                          "Partial Pinstripe",
                                           "Patternless",
                                            "Peppered",
                                             "Pet Only",
                                              "Phantom",
                                               "Pin-Dashed",
                                                "Pinstripe",
                                                 "Portholes",
                                                  "Quad-Stripe",
                                                   "Red",
                                                    "Red Base",
                                                     "Red Spot",
                                                      "Reverse Pinstripe",
                                                       "Snowflake",
                                                        "Soft Scale",
                                                         "Solid Back",
                                                          "Super Dalmatian",
                                                           "Super Stripe",
                                                            "Tailless",
                                                             "Tangerine",
                                                              "Tiger",
                                                               "Tri-Color",
                                                                "White Out",
                                                                  "White Tip",
                                                                   "White Wall",
                                                                    "Yellow",
                                                                     "Yellow Base"])
const genesMap = {
  'Crested Gecko': crestedGenes,
  'Ball Python': snakeGenes,
  // add other animal types and their genes here
};
  const router = useRouter();

  const handleSubmit = (e) => {
    e.preventDefault();
    // Use router.push to change the URL without page refresh.
    router.push({
      pathname: '/search',
      query: { type, term, genes }, // This will add ?type=value&gene=value to the URL.
    });
  };

  return (
    <form onSubmit={handleSubmit} className={s.searchForm}>
      <input
        type="text"
        placeholder="Search for an animal"
        className={s.searchInput}
        value={term}
        onChange={(e) => setTerm(e.target.value)}
      />

<select
value={type}
onChange={(e) => setType(e.target.value)}
className={s.searchInput}
>
<option value="">All types</option>
{/* Map over your animal types here */}
<option value="Crested Gecko">Crested Gecko</option>
<option value="Ball Python">Ball Python</option>
{/* ... */}
</select>
<select
value={genes}
onChange={(e) => setGenes(e.target.value)}
className={s.searchInput}
>
<option value="">{type =="" ? "Select an Animal Type" : "All genes" }</option>
{/* Map over your genes here */}
{type && genesMap[type].map((gene) => (
<option key={gene} value={gene}>
{gene}
</option>
))}
{/* ... */}
</select>
      <button className={s.searchButton} type="submit">Search</button>
    </form>
  );
}

