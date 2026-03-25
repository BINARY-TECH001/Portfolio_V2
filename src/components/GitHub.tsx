import { useRef } from "react";
import { motion, useInView } from "framer-motion";
import { useQuery } from "@tanstack/react-query";
import { FaGithub } from "react-icons/fa6";
import { Star, GitFork, BookOpen, Users, Activity, ExternalLink, Building2 } from "lucide-react";

interface GitHubUser {
  login: string;
  name: string;
  bio: string;
  public_repos: number;
  followers: number;
  following: number;
  avatar_url: string;
  created_at: string;
}

interface GitHubRepo {
  id: number;
  name: string;
  description: string | null;
  stargazers_count: number;
  forks_count: number;
  language: string | null;
  html_url: string;
}

interface GitHubOrg {
  login: string;
  avatar_url: string;
  description: string | null;
}

interface ContributionDay {
  date: string;
  count: number;
  level: 0 | 1 | 2 | 3 | 4;
}

interface ContributionsResponse {
  contributions: ContributionDay[];
  total: Record<string, number>;
}

const GITHUB_USERNAME = "binary-tech001";

const langColors: Record<string, string> = {
  JavaScript: "#f1e05a",
  TypeScript: "#3178c6",
  Python: "#3572a5",
  HTML: "#e34c26",
  CSS: "#563d7c",
  Shell: "#89e051",
  Go: "#00add8",
  Rust: "#dea584",
  Vue: "#41b883",
  Svelte: "#ff3e00",
  Java: "#b07219",
  "C#": "#178600",
  "C++": "#f34b7d",
  Dart: "#00b4ab",
};

/* Contribution graph level → color */
const CONTRIB_LEVELS: Record<number, string> = {
  0: "rgba(150,150,150,0.1)",
  1: "rgba(255,102,0,0.18)",
  2: "rgba(255,102,0,0.38)",
  3: "rgba(255,102,0,0.65)",
  4: "#ff6600",
};

const WEEK_DAYS = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];
const MONTHS = ["Jan","Feb","Mar","Apr","May","Jun","Jul","Aug","Sep","Oct","Nov","Dec"];


function ContributionGraph({ contributions }: { contributions: ContributionDay[] }) {
  if (!contributions.length) return null;

  // Group into weeks
  const weeks: ContributionDay[][] = [];
  let currentWeek: ContributionDay[] = [];

  contributions.forEach((day) => {
    const dow = new Date(day.date).getDay();
    if (dow === 0 && currentWeek.length) {
      weeks.push(currentWeek);
      currentWeek = [];
    }
    currentWeek.push(day);
  });
  if (currentWeek.length) weeks.push(currentWeek);

  // Month labels
  const monthLabels: { label: string; col: number }[] = [];
  let lastMonth = -1;

  weeks.forEach((week, wi) => {
    const firstDay = week[0];
    if (!firstDay) return;
    const m = new Date(firstDay.date).getMonth();
    if (m !== lastMonth) {
      monthLabels.push({ label: MONTHS[m], col: wi });
      lastMonth = m;
    }
  });

  return (
    <div className="w-full overflow-x-auto">
      {/* Month labels */}
      <div className="grid mb-2 pl-10 text-xs text-foreground/30 font-mono"
           style={{ gridTemplateColumns: `repeat(${weeks.length}, 1fr)` }}>
        {monthLabels.map(({ label, col }, i) => (
          <div
            key={i}
            style={{ gridColumnStart: col + 1 }}
          >
            {label}
          </div>
        ))}
      </div>

      <div className="flex w-full gap-2">
        {/* Day labels */}
        <div className="flex flex-col justify-between mr-2 text-xs text-foreground/25 font-mono">
          {WEEK_DAYS.map((d, i) => (
            <div key={d} className={i % 2 === 0 ? "opacity-0" : ""}>
              {d}
            </div>
          ))}
        </div>

        {/* Graph */}
        <div
          className="grid w-full gap-[3px]"
          style={{
            gridTemplateColumns: `repeat(${weeks.length}, 1fr)`,
            gridTemplateRows: `repeat(7, 1fr)`
          }}
        >
          {weeks.map((week, wi) =>
            Array.from({ length: 7 }).map((_, di) => {
              const day = week.find(
                (d) => new Date(d.date).getDay() === di
              );

              return (
                <div
                  key={`${wi}-${di}`}
                  title={
                    day
                      ? `${day.date}: ${day.count} contribution${
                          day.count !== 1 ? "s" : ""
                        }`
                      : ""
                  }
                  className="aspect-square rounded-[3px] transition-all duration-200 hover:scale-110"
                  style={{
                    backgroundColor: day
                      ? CONTRIB_LEVELS[day.level]
                      : CONTRIB_LEVELS[0]
                  }}
                />
              );
            })
          )}
        </div>
      </div>

      {/* Legend */}
      <div className="flex items-center gap-2 mt-4 justify-end">
        <span className="text-xs text-foreground/30 font-mono">Less</span>
        {[0, 1, 2, 3, 4].map((lvl) => (
          <div
            key={lvl}
            className="w-3 h-3 rounded-[3px]"
            style={{ backgroundColor: CONTRIB_LEVELS[lvl] }}
          />
        ))}
        <span className="text-xs text-foreground/30 font-mono">More</span>
      </div>
    </div>
  );
}

export default function GitHub() {
  const sectionRef = useRef<HTMLElement>(null);
  const isInView = useInView(sectionRef, { once: true, margin: "-100px" });

  const { data: user, isLoading: userLoading } = useQuery<GitHubUser>({
    queryKey: ["github-user"],
    queryFn: () =>
      fetch(`https://api.github.com/users/${GITHUB_USERNAME}`)
        .then((r) => r.json())
        .then((d) => {
          if (d.message) throw new Error(d.message);
          return d;
        }),
    staleTime: 1000 * 60 * 15,
    retry: 1,
  });

  const { data: repos, isLoading: reposLoading } = useQuery<GitHubRepo[]>({
    queryKey: ["github-repos"],
    queryFn: () =>
      fetch(`https://api.github.com/users/${GITHUB_USERNAME}/repos?sort=updated&per_page=30`)
        .then((r) => r.json())
        .then((d) => (Array.isArray(d) ? d : [])),
    staleTime: 1000 * 60 * 15,
    retry: 1,
  });

  const { data: orgs } = useQuery<GitHubOrg[]>({
    queryKey: ["github-orgs"],
    queryFn: () =>
      fetch(`https://api.github.com/users/${GITHUB_USERNAME}/orgs`)
        .then((r) => r.json())
        .then((d) => (Array.isArray(d) ? d : [])),
    staleTime: 1000 * 60 * 30,
    retry: 1,
  });

  const { data: contributions, isLoading: contribLoading } = useQuery<ContributionsResponse>({
    queryKey: ["github-contributions"],
    queryFn: () =>
      fetch(`https://github-contributions-api.jogruber.de/v4/${GITHUB_USERNAME}?y=last`)
        .then((r) => r.json())
        .catch(() => null),
    staleTime: 1000 * 60 * 30,
    retry: 1,
  });

  const reposArray: GitHubRepo[] = Array.isArray(repos) ? repos : [];
  const topRepos = reposArray
    .filter((r) => r.description)
    .sort((a, b) => b.stargazers_count - a.stargazers_count || b.forks_count - a.forks_count)
    .slice(0, 6);

  const langCounts: Record<string, number> = {};
  reposArray.forEach((repo) => {
    if (repo.language) langCounts[repo.language] = (langCounts[repo.language] || 0) + 1;
  });
  const topLangs = Object.entries(langCounts).sort(([, a], [, b]) => b - a).slice(0, 5);
  const totalLangs = topLangs.reduce((a, [, v]) => a + v, 0);

  const totalContribs = contributions?.total
    ? Object.values(contributions.total).reduce((a, b) => a + b, 0)
    : null;

  const currentYear = new Date().getFullYear();
  const thisYearContribs = contributions?.total?.[currentYear] ?? null;

  return (
    <section ref={sectionRef} id="github" className="py-32 px-6 md:px-12 lg:px-24">
      <div className="max-w-7xl mx-auto">
        {/* Heading */}
        <motion.div
          initial={{ opacity: 0, x: -30 }}
          animate={isInView ? { opacity: 1, x: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="mb-16"
        >
          <span className="section-label">Open Source</span>
          <div className="w-8 h-0.5 bg-[#ff6600] mt-3 mb-6" />
          <h2 className="text-3xl md:text-4xl font-bold text-foreground leading-tight">
            Building in the{" "}
            <span className="font-serif italic text-[#ff6600]">open</span>
          </h2>
        </motion.div>

        {/* Contribution Graph — full width */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, delay: 0.05 }}
          className="border border-border/40 rounded-sm p-6 mb-5"
        >
          <div className="flex flex-wrap items-center justify-between gap-4 mb-6">
            <div className="flex items-center gap-3">
              <Activity size={13} className="text-[#ff6600]" />
              <span className="text-xs font-semibold tracking-widest text-foreground/25 uppercase">
                Contribution Activity
              </span>
            </div>
            <div className="flex items-center gap-6">
              {thisYearContribs !== null && (
                <div className="text-right">
                  <div className="text-lg font-bold font-mono text-[#ff6600]">
                    {thisYearContribs.toLocaleString()}
                  </div>
                  <div className="text-xs text-foreground/30 font-mono">{currentYear} contributions</div>
                </div>
              )}
              {totalContribs !== null && totalContribs !== thisYearContribs && (
                <div className="text-right">
                  <div className="text-lg font-bold font-mono text-foreground/70">
                    {totalContribs.toLocaleString()}
                  </div>
                  <div className="text-xs text-foreground/30 font-mono">total contributions</div>
                </div>
              )}
            </div>
          </div>

          {contribLoading ? (
            <div className="h-[120px] animate-pulse flex flex-col gap-1">
              {[...Array(7)].map((_, i) => (
                <div key={i} className="flex gap-1 flex-1">
                  {[...Array(52)].map((_, j) => (
                    <div key={j} className="flex-1 rounded-[2px]" style={{ backgroundColor: "rgba(150,150,150,0.1)" }} />
                  ))}
                </div>
              ))}
            </div>
          ) : contributions?.contributions ? (
            <ContributionGraph contributions={contributions.contributions} />
          ) : (
            <div className="h-24 flex items-center justify-center text-foreground/25 text-xs font-mono">
              Contribution data unavailable — view on{" "}
              <a href={`https://github.com/${GITHUB_USERNAME}`} className="text-[#ff6600] ml-1 hover:underline">
                GitHub →
              </a>
            </div>
          )}
        </motion.div>

        {/* Profile + Repos grid */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-5">
          {/* Profile card */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.15 }}
            className="border border-border/40 rounded-sm p-6 flex flex-col gap-6"
          >
            {/* Avatar + name */}
            <div className="flex items-center gap-3">
              {user?.avatar_url ? (
                <img
                  src={user.avatar_url}
                  alt={user.name || GITHUB_USERNAME}
                  className="w-10 h-10 rounded-sm border border-border/40 object-cover"
                />
              ) : (
                <div className="w-10 h-10 border border-border/40 rounded-sm flex items-center justify-center">
                  <FaGithub size={16} className="text-foreground/50" />
                </div>
              )}
              <div>
                {userLoading ? (
                  <div className="h-3.5 w-28 bg-foreground/10 rounded animate-pulse" />
                ) : (
                  <div className="text-sm font-semibold text-foreground">{user?.name || GITHUB_USERNAME}</div>
                )}
                <div className="text-xs text-foreground/35 font-mono">@{GITHUB_USERNAME}</div>
              </div>
            </div>

            {user?.bio && (
              <p className="text-xs text-foreground/45 leading-relaxed">{user.bio}</p>
            )}

            {/* Stats */}
            <div className="grid grid-cols-2 gap-3">
              {[
                { icon: BookOpen, label: "Repos", value: user?.public_repos },
                { icon: Users, label: "Followers", value: user?.followers },
              ].map(({ icon: Icon, label, value }) => (
                <div
                  key={label}
                  className="border border-border/40 rounded-sm p-3"
                  data-testid={`stat-github-${label.toLowerCase()}`}
                >
                  <div className="flex items-center gap-1.5 mb-1.5">
                    <Icon size={11} className="text-[#ff6600]" />
                    <span className="text-xs text-foreground/30 font-semibold tracking-wide uppercase">{label}</span>
                  </div>
                  <div className="text-xl font-bold font-mono text-foreground">
                    {userLoading ? "—" : (value ?? 0)}
                  </div>
                </div>
              ))}
            </div>

            {/* Languages */}
            {topLangs.length > 0 && (
              <div>
                <div className="text-xs font-semibold tracking-widest text-foreground/25 uppercase mb-3">
                  Top Languages
                </div>
                <div className="flex h-1.5 rounded-full overflow-hidden mb-3">
                  {topLangs.map(([lang, count]) => (
                    <div
                      key={lang}
                      style={{
                        width: `${(count / totalLangs) * 100}%`,
                        backgroundColor: langColors[lang] || "#888",
                      }}
                    />
                  ))}
                </div>
                <div className="flex flex-wrap gap-x-4 gap-y-1.5">
                  {topLangs.map(([lang, count]) => (
                    <div key={lang} className="flex items-center gap-1.5">
                      <div className="w-1.5 h-1.5 rounded-full" style={{ backgroundColor: langColors[lang] || "#888" }} />
                      <span className="text-xs text-foreground/40 font-mono">{lang}</span>
                      <span className="text-xs text-foreground/20 font-mono">
                        {Math.round((count / totalLangs) * 100)}%
                      </span>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Organizations */}
            {orgs && orgs.length > 0 && (
              <div>
                <div className="flex items-center gap-1.5 mb-3">
                  <Building2 size={11} className="text-[#ff6600]" />
                  <div className="text-xs font-semibold tracking-widest text-foreground/25 uppercase">
                    Organizations
                  </div>
                </div>
                <div className="flex flex-wrap gap-2">
                  {orgs.map((org) => (
                    <a
                      key={org.login}
                      href={`https://github.com/${org.login}`}
                      target="_blank"
                      rel="noopener noreferrer"
                      title={org.description || org.login}
                      data-testid={`link-org-${org.login}`}
                      className="group flex items-center gap-2 border border-border/40 rounded-sm px-2.5 py-1.5 hover:border-[#ff6600]/30 transition-colors"
                    >
                      <img
                        src={org.avatar_url}
                        alt={org.login}
                        className="w-4 h-4 rounded-[2px] object-cover"
                      />
                      <span className="text-xs font-mono text-foreground/40 group-hover:text-foreground/70 transition-colors">
                        {org.login}
                      </span>
                    </a>
                  ))}
                </div>
              </div>
            )}

            <div className="mt-auto flex items-center gap-2">
              <div className="w-1.5 h-1.5 rounded-full bg-green-400 animate-pulse" />
              <span className="text-xs text-foreground/30 font-mono">Active contributor</span>
            </div>

            <a
              href={`https://github.com/${GITHUB_USERNAME}`}
              target="_blank"
              rel="noopener noreferrer"
              data-testid="link-github-profile"
              className="flex items-center gap-2 text-xs text-[#ff6600]/60 hover:text-[#ff6600] transition-colors border-t border-border/40 pt-4"
            >
              <FaGithub size={12} />
              View full profile
              <ExternalLink size={11} />
            </a>
          </motion.div>

          {/* Repos grid */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.25 }}
            className="lg:col-span-2 border border-border/40 rounded-sm p-6"
          >
            <div className="flex items-center gap-2 mb-6">
              <Star size={13} className="text-[#ff6600]" />
              <span className="text-xs font-semibold tracking-widest text-foreground/25 uppercase">
                Top Repositories
              </span>
            </div>

            {reposLoading ? (
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                {[...Array(6)].map((_, i) => (
                  <div key={i} className="border border-border/40 rounded-sm p-4 animate-pulse">
                    <div className="h-3 w-1/2 bg-foreground/10 rounded mb-2" />
                    <div className="h-2 w-full bg-foreground/10 rounded mb-1" />
                    <div className="h-2 w-3/4 bg-foreground/10 rounded" />
                  </div>
                ))}
              </div>
            ) : topRepos.length === 0 ? (
              <div className="flex flex-col items-center justify-center h-40 gap-3">
                <FaGithub size={24} className="text-foreground/15" />
                <span className="text-foreground/30 text-sm font-mono text-center">
                  Rate limited or no repos found.{" "}
                  <a href={`https://github.com/${GITHUB_USERNAME}`} className="text-[#ff6600] hover:underline">
                    View on GitHub →
                  </a>
                </span>
              </div>
            ) : (
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                {topRepos.map((repo, idx) => (
                  <motion.a
                    key={repo.id}
                    href={repo.html_url}
                    target="_blank"
                    rel="noopener noreferrer"
                    data-testid={`card-repo-${repo.id}`}
                    initial={{ opacity: 0, y: 16 }}
                    animate={isInView ? { opacity: 1, y: 0 } : {}}
                    transition={{ delay: 0.3 + idx * 0.07, duration: 0.45 }}
                    whileHover={{ y: -2, transition: { duration: 0.15 } }}
                    className="group border border-border/40 rounded-sm p-4 hover:border-[#ff6600]/25 transition-all duration-200 flex flex-col justify-between gap-3"
                  >
                    <div>
                      <div className="flex items-start justify-between gap-2 mb-2">
                        <span className="text-sm font-semibold text-foreground transition-colors truncate">
                          {repo.name}
                        </span>
                        {repo.language && (
                          <div className="flex items-center gap-1 shrink-0">
                            <div
                              className="w-2 h-2 rounded-full"
                              style={{ backgroundColor: langColors[repo.language] || "#888" }}
                            />
                            <span className="text-xs text-foreground/30 font-mono">{repo.language}</span>
                          </div>
                        )}
                      </div>
                      {repo.description && (
                        <p className="text-xs text-foreground/40 leading-relaxed line-clamp-2">
                          {repo.description}
                        </p>
                      )}
                    </div>
                    <div className="flex items-center gap-4">
                      <div className="flex items-center gap-1 text-foreground/25">
                        <Star size={11} />
                        <span className="text-xs font-mono">{repo.stargazers_count}</span>
                      </div>
                      <div className="flex items-center gap-1 text-foreground/25">
                        <GitFork size={11} />
                        <span className="text-xs font-mono">{repo.forks_count}</span>
                      </div>
                    </div>
                  </motion.a>
                ))}
              </div>
            )}
          </motion.div>
        </div>
      </div>
    </section>
  );
}
