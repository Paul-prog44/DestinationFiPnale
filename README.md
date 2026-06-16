# Destination FIPnale

Application web de réservation (hôtels, voitures, voyages).

- **Frontend** : React 19 + Vite (Node 24)
- **Backend** : Spring Boot 3 (Java 21)
- **Base de données** : PostgreSQL 16

## Accès en ligne

L'application est hébergée ici : **https://dfip.totorow.com/**

---

## Lancer le projet en local

### Prérequis

- [Docker](https://www.docker.com/) et Docker Compose

### Démarrage (recommandé — tout en un)

À la racine du projet :

```bash
docker compose up
```

Cette commande lance les 3 services :

| Service    | Conteneur     | URL / Port local        |
|------------|---------------|-------------------------|
| Frontend   | `Front-React` | http://localhost:5173   |
| Backend    | `Back-Spring` | http://localhost:8093   |
| PostgreSQL | `Postgres-DB` | `localhost:5432`        |

> Le frontend installe ses dépendances et démarre automatiquement.
> Le backend compile et démarre via Maven (`./mvnw spring-boot:run`).
> Le premier lancement peut prendre quelques minutes.

Pour reconstruire / forcer la mise à jour :

```bash
docker compose up --build
```

Lancer en arrière-plan :

```bash
docker compose up -d
```

Arrêter :

```bash
docker compose down
```

Arrêter et supprimer les données de la base :

```bash
docker compose down -v
```

---

## Accéder à l'application en local

Une fois les conteneurs démarrés :

- **Site web** : http://localhost:5173
- **API backend** : http://localhost:8093/api

Le frontend appelle l'API via la variable `VITE_API_URL` définie dans [Front/.env](Front/.env) (par défaut `http://localhost:8093`).


### Base de données


| Paramètre | Valeur                  |
|-----------|-------------------------|
| Base      | `DestinationFIPnale`    |
| Utilisateur | `admin`               |
| Mot de passe | `password`           |
| Port      | `5432`                  |

---

##  Comptes de test (seed)

**Mot de passe (identique pour tous)** : `password`

| Email               | Prénom / Nom    | Rôle        |
|---------------------|-----------------|-------------|
| `user1@example.com` | Jean Dupont     | `ROLE_USER` |
| `user2@example.com` | Marie Curie     | `ROLE_USER` |
| `user3@example.com` | Lucas Martin    | `ROLE_USER` |
| `user4@example.com` | Sophie Bernard  | `ROLE_USER` |
| `user5@example.com` | Thomas Dubois   | `ROLE_USER` |

> Ces comptes permettent de se connecter directement via la page de connexion du site.

---

## Structure du projet

```
.
├── Front/              # Application React (Vite)
├── Back/               # API Spring Boot
├── docker-compose.yml  # Orchestration des services
└── README.md
```
