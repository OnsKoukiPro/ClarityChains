<picture><source media="(prefers-color-scheme: dark)" srcset="https://raw.githubusercontent.com/OnsKoukiPro/ClarityChains/main/.github/assets/banner-dark.svg?v=r1"><img src="https://raw.githubusercontent.com/OnsKoukiPro/ClarityChains/main/.github/assets/banner-light.svg?v=r1" alt="ClarityChains: LLM agents that read supplier offers, flag the traps and pick a winner." width="100%"></picture>

<p align="center"><a href="https://clarity-chains.vercel.app"><b>Open the live demo →</b></a></p>

<a href="https://clarity-chains.vercel.app"><picture><source media="(prefers-color-scheme: dark)" srcset="https://raw.githubusercontent.com/OnsKoukiPro/ClarityChains/main/.github/assets/screens-dark.svg?v=r1"><img src="https://raw.githubusercontent.com/OnsKoukiPro/ClarityChains/main/.github/assets/screens-light.svg?v=r1" alt="Screens of the live app: Clare AI assistant, RFX dashboard, executive report, supplier recommendations" width="100%"></picture></a>

<picture><source media="(prefers-color-scheme: dark)" srcset="https://raw.githubusercontent.com/OnsKoukiPro/ClarityChains/main/.github/assets/stats-dark.svg?v=r1"><img src="https://raw.githubusercontent.com/OnsKoukiPro/ClarityChains/main/.github/assets/stats-light.svg?v=r1" alt="4 agent stages, 6 file formats in, 6 containers, 1 command to run" width="100%"></picture>

<picture><source media="(prefers-color-scheme: dark)" srcset="https://raw.githubusercontent.com/OnsKoukiPro/ClarityChains/main/.github/assets/s1-dark.svg?v=r1"><img src="https://raw.githubusercontent.com/OnsKoukiPro/ClarityChains/main/.github/assets/s1-light.svg?v=r1" alt="01 / Pipeline: how offers get read" width="100%"></picture>

<picture><source media="(prefers-color-scheme: dark)" srcset="https://raw.githubusercontent.com/OnsKoukiPro/ClarityChains/main/.github/assets/pipeline-dark.svg?v=r1"><img src="https://raw.githubusercontent.com/OnsKoukiPro/ClarityChains/main/.github/assets/pipeline-light.svg?v=r1" alt="Offers are normalised, then LangChain agents run gap analysis, risk, scoring and an executive report; a FAISS retriever powers a chat agent" width="100%"></picture>

Drop in supplier offers in any format. The agents compare each one against the RFX, score the risks with weights you set, rank the suppliers and write the executive report, with savings and split-award options. Then ask Clare anything about the bids.

<picture><source media="(prefers-color-scheme: dark)" srcset="https://raw.githubusercontent.com/OnsKoukiPro/ClarityChains/main/.github/assets/s2-dark.svg?v=r1"><img src="https://raw.githubusercontent.com/OnsKoukiPro/ClarityChains/main/.github/assets/s2-light.svg?v=r1" alt="02 / System: what runs where" width="100%"></picture>

<picture><source media="(prefers-color-scheme: dark)" srcset="https://raw.githubusercontent.com/OnsKoukiPro/ClarityChains/main/.github/assets/system-dark.svg?v=r1"><img src="https://raw.githubusercontent.com/OnsKoukiPro/ClarityChains/main/.github/assets/system-light.svg?v=r1" alt="Docker Compose: React frontend behind nginx, Django backend with Postgres and Redis, FastAPI agent calling Azure OpenAI" width="100%"></picture>

<details>
<summary><b>Run it locally</b></summary>

```bash
cp .env.example .env       # fill in Azure OpenAI key, endpoint, Postgres password

make build && make up      # frontend + API on http://localhost
make migrate               # Django migrations
make logs                  # follow every service
```

| Service | Path | Role |
|---|---|---|
| `frontend` | `frontend/` | React + TypeScript + Vite, Radix UI |
| `nginx` | `nginx/` | serves the UI, proxies `/api` |
| `backend` | `backend/` | Django: auth, procurement (offers, documents, analyses, chat), workflows |
| `agent` | `agent/` | FastAPI + LangChain: `/api/process-files`, `/api/analyze`, `/api/chat`, `/api/comparison-summary` |
| `db`, `redis` | | Postgres 15, Redis 7 |

</details>

Related: [claritychains-model](https://github.com/OnsKoukiPro/claritychains-model), the forecasting and hedging prototype behind it.
