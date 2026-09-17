"use client";

import { useState } from "react";

const checklist = [
  {
    category: "State & données",
    color: "#7F77DD",
    light: "#EEEDFE",
    items: [
      {
        title: "State dérivé inutile",
        problem: `const [count, setCount] = useState(0);

// ❌ count est une copie dérivée de filtered
const filtered = users.filter(u =>
  u.name.includes(search)
);

const handleSearch = (e) => {
  setSearch(e.target.value);
  setCount(filtered.length); // stale ! filtered pas encore recalculé
};

return <h1>Users ({count})</h1>;`,
        solution: `// ✅ computed directement — toujours à jour
const filtered = users.filter(u =>
  u.name.includes(search)
);

return <h1>Users ({filtered.length})</h1>;`,
        qa: "Un state dérivé crée une source de vérité supplémentaire qui peut se désynchroniser. Ici setCount est appelé avec l'ancienne valeur de filtered car le recalcul n'a pas encore eu lieu. La règle : si une valeur peut être calculée depuis un state existant, ce n'est pas un state — c'est une variable ou un useMemo.",
      },
      {
        title: "State muté directement",
        problem: `const [items, setItems] = useState([]);

// ❌ mutation directe — React ne détecte pas le changement
const addItem = (item) => {
  items.push(item);
  setItems(items); // même référence → pas de re-render
};`,
        solution: `// ✅ nouvelle référence à chaque update
const addItem = (item) => {
  setItems([...items, item]);
};

// ✅ ou avec la forme fonctionnelle (plus safe)
const addItem = (item) => {
  setItems(prev => [...prev, item]);
};`,
        qa: "React compare les références pour décider de re-render. En mutant le tableau original et en le repassant à setItems, on donne la même référence — React pense qu'il n'y a pas eu de changement et ignore le re-render. Il faut toujours retourner une nouvelle référence.",
      },
      {
        title: "State initialisé avec le mauvais type",
        problem: `// ❌ null au lieu de []
const [users, setUsers] = useState(null);

// Crash immédiat : Cannot read properties of null
return (
  <ul>
    {users.map(u => <li>{u.name}</li>)}
  </ul>
);`,
        solution: `// ✅ toujours initialiser avec le bon type
const [users, setUsers] = useState([]);
const [user, setUser] = useState(null); // OK si on vérifie avant usage

// ✅ ou guard avant le render
if (!users) return <Spinner />;`,
        qa: "L'initialisation du state doit refléter la shape finale de la donnée. Un tableau vide permet d'appeler .map() sans crash pendant le premier render. Si on veut distinguer 'pas encore chargé' de 'vide', on peut garder null mais avec un guard explicite avant le rendu.",
      },
    ],
  },
  {
    category: "useEffect",
    color: "#1D9E75",
    light: "#E1F5EE",
    items: [
      {
        title: "Dépendances → boucle infinie",
        problem: `// ❌ [users] en dépendance
useEffect(() => {
  fetchUsers().then(data => {
    setUsers(data); // setUsers → re-render → users change
  });             // → effect retourne → boucle infinie
}, [users]);`,
        solution: `// ✅ [] = ne tourne qu'au montage
useEffect(() => {
  fetchUsers().then(data => setUsers(data));
}, []);

// ✅ si dépendance réelle nécessaire
useEffect(() => {
  fetchUserById(userId).then(setUser);
}, [userId]); // ne retourne que si userId change`,
        qa: "Le tableau de dépendances dit à React 'relance-moi quand ces valeurs changent'. Si on y met une valeur qu'on met à jour dans l'effect lui-même, on crée une boucle. La règle : une dépendance dans le tableau ne doit jamais être modifiée dans ce même effect.",
      },
      {
        title: "Pas de cleanup → memory leak",
        problem: `// ❌ setInterval jamais nettoyé
useEffect(() => {
  const id = setInterval(() => {
    setTime(Date.now());
  }, 1000);
  // Si le composant est démonté, l'interval tourne encore
  // et setState est appelé sur un composant mort
}, []);`,
        solution: `// ✅ cleanup via le return de l'effect
useEffect(() => {
  const id = setInterval(() => {
    setTime(Date.now());
  }, 1000);

  return () => clearInterval(id); // cleanup au démontage
}, []);

// Même pattern pour event listeners
useEffect(() => {
  window.addEventListener('resize', handler);
  return () => window.removeEventListener('resize', handler);
}, []);`,
        qa: "Le return d'un useEffect est une fonction de cleanup appelée quand le composant se démonte ou avant que l'effect ne retourne. Sans ça, les timers et listeners continuent à tourner et peuvent appeler setState sur un composant mort — React loggue un warning et ça peut causer des bugs subtils en prod.",
      },
      {
        title: "setState sur composant démonté",
        problem: `// ❌ pas de guard sur le démontage
useEffect(() => {
  fetch('/api/user')
    .then(r => r.json())
    .then(data => {
      setUser(data); // si composant démonté entre-temps → warning
    });
}, []);`,
        solution: `// ✅ AbortController (méthode moderne)
useEffect(() => {
  const controller = new AbortController();

  fetch('/api/user', { signal: controller.signal })
    .then(r => r.json())
    .then(setUser)
    .catch(err => {
      if (err.name !== 'AbortError') throw err;
    });

  return () => controller.abort();
}, []);`,
        qa: "Si l'utilisateur navigue avant que le fetch soit terminé, le composant est démonté mais le .then() s'exécute quand même. L'AbortController annule la requête réseau dans le cleanup, ce qui est la solution native et recommandée depuis que fetch la supporte largement.",
      },
    ],
  },
  {
    category: "Rendu de listes",
    color: "#D85A30",
    light: "#FAECE7",
    items: [
      {
        title: "key manquante ou key={index}",
        problem: `// ❌ pas de key
users.map(user => <li>{user.name}</li>)

// ❌ key={index} — dangereux si liste réordonnée/filtrée
users.map((user, i) => <li key={i}>{user.name}</li>)
// Si on supprime l'item 0, tous les états liés aux items
// se décalent — bugs d'UI très difficiles à debugger`,
        solution: `// ✅ id stable et unique
users.map(user => (
  <li key={user.id}>{user.name}</li>
))

// ✅ si pas d'id, générer un identifiant stable à la création
// (pas au render)
const [items] = useState(() =>
  rawItems.map(item => ({ ...item, id: crypto.randomUUID() }))
);`,
        qa: "La key aide React à identifier quel élément a changé dans la liste lors de la réconciliation. Sans key stable, React re-rend tout. Avec key={index}, si la liste est filtrée ou réordonnée, un item peut hériter du state (champ focus, animation) d'un autre item — bug silencieux et difficile à reproduire.",
      },
      {
        title: "Filtre/sort qui mutent le tableau",
        problem: `// ❌ sort() mute le tableau original
const sorted = users.sort((a, b) =>
  a.name.localeCompare(b.name)
); // users est muté → comportement imprévisible`,
        solution: `// ✅ copier avant de trier
const sorted = [...users].sort((a, b) =>
  a.name.localeCompare(b.name)
);

// ✅ ou avec toSorted() (ES2023)
const sorted = users.toSorted((a, b) =>
  a.name.localeCompare(b.name)
);`,
        qa: "Array.sort() est in-place — il mute le tableau original. Dans React, muter le state directement peut rater des re-renders ou produire des comportements étranges selon l'ordre des opérations. La règle : toujours spread avant sort, et filter retourne déjà un nouveau tableau donc c'est safe.",
      },
    ],
  },
  {
    category: "Formulaires / inputs",
    color: "#185FA5",
    light: "#E6F1FB",
    items: [
      {
        title: "value sans onChange → input bloqué",
        problem: `// ❌ controlled sans handler → input figé
<input value={search} />
// React contrôle la valeur mais rien ne la met à jour
// L'utilisateur ne peut pas taper`,
        solution: `// ✅ toujours value + onChange ensemble
<input
  value={search}
  onChange={e => setSearch(e.target.value)}
/>`,
        qa: "Quand on passe value à un input, React prend le contrôle et override ce que l'utilisateur tape à chaque render. Sans onChange pour mettre à jour le state, la valeur est toujours la même et l'input est bloqué. C'est le contrat du composant contrôlé : tu gères la valeur, tu gères les updates.",
      },
      {
        title: "Recherche sans toLowerCase des deux côtés",
        problem: `// ❌ search pas lowercased
const filtered = users.filter(u =>
  u.name.toLowerCase().includes(search)
);
// "John" dans la liste ne matche pas si l'user tape "john"
// car "john".toLowerCase() = "john" mais search = "John"`,
        solution: `// ✅ lowercase des deux côtés
const filtered = users.filter(u =>
  u.name.toLowerCase().includes(search.toLowerCase())
);

// ✅ ou normaliser à la saisie
const handleSearch = (e) => {
  setSearch(e.target.value.toLowerCase());
};`,
        qa: "La comparaison de strings est case-sensitive par défaut en JS. Pour une recherche UX correcte, il faut normaliser les deux termes. Je préfère normaliser au moment du filter plutôt qu'à la saisie pour garder la valeur affichée fidèle à ce que l'utilisateur a tapé.",
      },
    ],
  },
  {
    category: "Async / JS",
    color: "#B4407A",
    light: "#FBEAF0",
    items: [
      {
        title: "Fetch sans .catch() → erreur silencieuse",
        problem: `// ❌ pas de gestion d'erreur
fetchUsers()
  .then(data => setUsers(data));
// Si le fetch échoue, rien ne se passe
// L'UI reste bloquée sur le loading state forever`,
        solution: `// ✅ toujours gérer l'erreur
const [error, setError] = useState(null);

fetchUsers()
  .then(data => setUsers(data))
  .catch(err => setError(err.message));

// Dans le rendu
if (error) return <p>Erreur : {error}</p>;`,
        qa: "Une promesse rejetée sans .catch() est une erreur silencieuse — l'UI se fige sans feedback. En prod c'est un bug invisible pour l'équipe. On doit toujours avoir un état d'erreur et l'afficher. En async/await c'est le même principe avec try/catch.",
      },
      {
        title: "Accès sur undefined avant chargement",
        problem: `// ❌ user est null au premier render
const [user, setUser] = useState(null);

// Crash : Cannot read properties of null (reading 'name')
return <h1>{user.name}</h1>;`,
        solution: `// ✅ optional chaining
return <h1>{user?.name}</h1>;

// ✅ ou early return
if (!user) return <Spinner />;
return <h1>{user.name}</h1>;

// ✅ ou initialisation défensive
const [user, setUser] = useState({ name: '', email: '' });`,
        qa: "Au premier render, la data n'est pas encore là. Il faut toujours anticiper cet état intermédiaire. J'utilise l'optional chaining pour les cas simples, et un early return avec un skeleton/spinner pour les pages entières — c'est aussi meilleur pour l'UX.",
      },
    ],
  },
  {
    category: "Perf / bonnes pratiques",
    color: "#639922",
    light: "#EAF3DE",
    items: [
      {
        title: "useCallback — fonction recréée à chaque render",
        problem: `// ❌ handleClick recréée à chaque render du parent
function Parent() {
  const handleClick = () => doSomething();
  // Si passée à un enfant React.memo → memo invalidé
  // à chaque render du parent
  return <Child onClick={handleClick} />;
}`,
        solution: `// ✅ useCallback stabilise la référence
const handleClick = useCallback(() => {
  doSomething();
}, []); // dépendances comme useEffect

// Utile surtout quand :
// - passée à un composant React.memo
// - utilisée comme dépendance d'un useEffect`,
        qa: "useCallback ne sert pas à 'optimiser toutes les fonctions' — c'est un piège junior. Il sert à stabiliser une référence de fonction pour éviter des re-renders inutiles en aval (React.memo) ou des retriggerings de useEffect. Sans ces deux cas, useCallback ajoute de la complexité pour rien.",
      },
      {
        title: "useMemo — calcul lourd recalculé inutilement",
        problem: `// ❌ filtrage recalculé à chaque render
// même si users et search n'ont pas changé
const filtered = users.filter(u =>
  u.name.toLowerCase().includes(search.toLowerCase())
);`,
        solution: `// ✅ mémoïsé — ne recalcule que si users ou search change
const filtered = useMemo(() =>
  users.filter(u =>
    u.name.toLowerCase().includes(search.toLowerCase())
  ),
  [users, search]
);

// Note : sur une liste de 10 items, useMemo est overkill.
// Pertinent sur des calculs vraiment coûteux (milliers d'items,
// transformations complexes)`,
        qa: "useMemo mémoïse un résultat de calcul. Comme useCallback, il ne faut pas l'utiliser partout — il a lui-même un coût. La règle : profiler d'abord, optimiser ensuite. Je l'utilise quand le calcul est mesurable (liste > 1000 items, agrégations complexes) ou quand le résultat est utilisé comme dépendance d'un useEffect.",
      },
    ],
  },
];

export default function ReactDebugCheckList() {
  const [activeCategory, setActiveCategory] = useState(0);
  const [activeItem, setActiveItem] = useState(0);
  const [tab, setTab] = useState("problem");

  const cat = checklist[activeCategory];
  const item = cat.items[activeItem];

  const handleCategory = (i) => {
    setActiveCategory(i);
    setActiveItem(0);
    setTab("problem");
  };

  const handleItem = (i) => {
    setActiveItem(i);
    setTab("problem");
  };

  return (
    <div
      style={{
        fontFamily: "var(--font-sans)",
        padding: "1.5rem 0",
        display: "flex",
        flexDirection: "column",
        gap: "1.25rem",
      }}
    >
      <h2 className="sr-only">
        Checklist de debug React — référence interview
      </h2>

      <div style={{ display: "flex", gap: "8px", flexWrap: "wrap" }}>
        {checklist.map((c, i) => (
          <button
            key={c.category}
            onClick={() => handleCategory(i)}
            style={{
              fontSize: "13px",
              padding: "5px 12px",
              borderRadius: "var(--border-radius-md)",
              border:
                activeCategory === i
                  ? `1.5px solid ${c.color}`
                  : "0.5px solid var(--color-border-tertiary)",
              background:
                activeCategory === i
                  ? c.light
                  : "var(--color-background-primary)",
              color:
                activeCategory === i ? c.color : "var(--color-text-secondary)",
              cursor: "pointer",
              fontWeight: activeCategory === i ? "500" : "400",
              transition: "all 0.15s",
            }}
          >
            {c.category}
          </button>
        ))}
      </div>

      <div style={{ display: "flex", gap: "1rem" }}>
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            gap: "6px",
            minWidth: "180px",
          }}
        >
          {cat.items.map((it, i) => (
            <button
              key={it.title}
              onClick={() => handleItem(i)}
              style={{
                textAlign: "left",
                fontSize: "13px",
                padding: "8px 12px",
                borderRadius: "var(--border-radius-md)",
                border: "0.5px solid var(--color-border-tertiary)",
                background:
                  activeItem === i
                    ? "var(--color-background-secondary)"
                    : "transparent",
                color:
                  activeItem === i
                    ? "var(--color-text-primary)"
                    : "var(--color-text-secondary)",
                cursor: "pointer",
                fontWeight: activeItem === i ? "500" : "400",
                lineHeight: "1.4",
              }}
            >
              {it.title}
            </button>
          ))}
        </div>

        <div
          style={{
            flex: 1,
            display: "flex",
            flexDirection: "column",
            gap: "12px",
          }}
        >
          <div style={{ display: "flex", gap: "6px" }}>
            {["problem", "solution", "qa"].map((t) => (
              <button
                key={t}
                onClick={() => setTab(t)}
                style={{
                  fontSize: "13px",
                  padding: "5px 14px",
                  borderRadius: "var(--border-radius-md)",
                  border:
                    tab === t
                      ? `1.5px solid ${cat.color}`
                      : "0.5px solid var(--color-border-tertiary)",
                  background: tab === t ? cat.light : "transparent",
                  color: tab === t ? cat.color : "var(--color-text-secondary)",
                  cursor: "pointer",
                  fontWeight: tab === t ? "500" : "400",
                }}
              >
                {t === "problem"
                  ? "❌ Problème"
                  : t === "solution"
                    ? "✅ Solution"
                    : "🎤 Q&A Senior"}
              </button>
            ))}
          </div>

          {tab !== "qa" ? (
            <pre
              style={{
                background: "var(--color-background-secondary)",
                border: "0.5px solid var(--color-border-tertiary)",
                borderRadius: "var(--border-radius-lg)",
                padding: "1.25rem",
                fontSize: "13px",
                lineHeight: "1.7",
                fontFamily: "var(--font-mono)",
                color: "var(--color-text-primary)",
                overflowX: "auto",
                margin: 0,
                whiteSpace: "pre-wrap",
              }}
            >
              {tab === "problem" ? item.problem : item.solution}
            </pre>
          ) : (
            <div
              style={{
                background: "var(--color-background-secondary)",
                border: `0.5px solid ${cat.color}33`,
                borderLeft: `3px solid ${cat.color}`,
                borderRadius: "var(--border-radius-lg)",
                padding: "1.25rem",
                fontSize: "14px",
                lineHeight: "1.8",
                color: "var(--color-text-primary)",
              }}
            >
              {item.qa}
            </div>
          )}
        </div>
      </div>

      <div
        style={{
          fontSize: "12px",
          color: "var(--color-text-tertiary)",
          textAlign: "right",
        }}
      >
        {checklist.reduce((acc, c) => acc + c.items.length, 0)} patterns •
        papernest prep
      </div>
    </div>
  );
}
