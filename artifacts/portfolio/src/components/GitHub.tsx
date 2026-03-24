import { useRef } from "react";
import { motion, useInView } from "framer-motion";
import { useQuery } from "@tanstack/react-query";
import { FaGithub } from "react-icons/fa6";
import { Star, GitFork, BookOpen, Users, Activity, ExternalLink } from "lucide-react";

interface GitHubUser {
  login: string;
  name: string;
  bio: string;
  public_repos: number;
  followers: number;
  following: number;
  avatar_url: string;
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
};

export default function GitHub() {
  const sectionRef = useRef<HTMLElement>(null);
  const isInView = useInView(sectionRef, { once: true, margin: "-100px" });

  const { data: user, isLoading: userLoading } = useQuery<GitHubUser>({
    queryKey: ["/github/user"],
    queryFn: () =>
      fetch(`https://api.github.com/users/${GITHUB_USERNAME}`)
        .then((r) => r.json())
        .then((d) => {
          if (d.message) throw new Error(d.message);
          return d;
        }),
    staleTime: 1000 * 60 * 10,
    retry: 1,
  });

  const { data: repos, isLoading: reposLoading } = useQuery<GitHubRepo[]>({
    queryKey: ["/github/repos"],
    queryFn: () =>
      fetch(`https://api.github.com/users/${GITHUB_USERNAME}/repos?sort=updated&per_page=20`)
        .then((r) => r.json())
        .then((d) => {
          if (!Array.isArray(d)) return [];
          return d;
        }),
    staleTime: 1000 * 60 * 10,
    retry: 1,
  });

  const reposArray: GitHubRepo[] = Array.isArray(repos) ? repos : [];
  const topRepos = reposArray.filter((r) => r.description).slice(0, 6);

  const langCounts: Record<string, number> = {};
  reposArray.forEach((repo) => {
    if (repo.language) langCounts[repo.language] = (langCounts[repo.language] || 0) + 1;
  });
  const topLangs = Object.entries(langCounts)
    .sort(([, a], [, b]) => b - a)
    .slice(0, 5);
  const totalLangs = topLangs.reduce((a, [, v]) => a + v, 0);

  return (
    <section ref={sectionRef} id="github" className="py-32 px-6 md:px-12 lg:px-24">
      <div className="max-w-7xl mx-auto">
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

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-5">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="border border-white/8 rounded-sm p-6 flex flex-col gap-6"
          >
            <div className="flex items-center gap-3">
              <div className="w-8 h-8 border border-white/10 rounded-sm flex items-center justify-center">
                <FaGithub size={16} className="text-foreground/50" />
              </div>
              <div>
                {userLoading ? (
                  <div className="h-3.5 w-28 bg-white/5 rounded animate-pulse" />
                ) : (
                  <div className="text-sm font-semibold text-foreground">{user?.name || GITHUB_USERNAME}</div>
                )}
                <div className="text-xs text-foreground/35 font-mono">@{GITHUB_USERNAME}</div>
              </div>
            </div>

            {user?.bio && (
              <p className="text-xs text-foreground/45 leading-relaxed">{user.bio}</p>
            )}

            <div className="grid grid-cols-2 gap-3">
              {[
                { icon: BookOpen, label: "Repos", value: user?.public_repos },
                { icon: Users, label: "Followers", value: user?.followers },
              ].map(({ icon: Icon, label, value }) => (
                <div
                  key={label}
                  className="border border-white/6 rounded-sm p-3"
                  data-testid={`stat-github-${label.toLowerCase()}`}
                >
                  <div className="flex items-center gap-1.5 mb-1.5">
                    <Icon size={11} className="text-[#ff6600]" />
                    <span className="text-xs text-foreground/30 font-semibold tracking-wide uppercase">{label}</span>
                  </div>
                  <div className="text-xl font-bold font-mono text-foreground">
                    {userLoading ? "—" : value ?? 0}
                  </div>
                </div>
              ))}
            </div>

            {topLangs.length > 0 && (
              <div>
                <div className="text-xs font-semibold tracking-widest text-foreground/25 uppercase mb-3">
                  Languages
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
                <div className="flex flex-wrap gap-x-4 gap-y-1">
                  {topLangs.map(([lang, count]) => (
                    <div key={lang} className="flex items-center gap-1.5">
                      <div className="w-1.5 h-1.5 rounded-full" style={{ backgroundColor: langColors[lang] || "#888" }} />
                      <span className="text-xs text-foreground/40 font-mono">{lang}</span>
                      <span className="text-xs text-foreground/20 font-mono">{Math.round((count / totalLangs) * 100)}%</span>
                    </div>
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
              className="flex items-center gap-2 text-xs text-[#ff6600]/60 hover:text-[#ff6600] transition-colors border-t border-white/5 pt-4"
            >
              <FaGithub size={12} />
              View full profile
              <ExternalLink size={11} />
            </a>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="lg:col-span-2 border border-white/8 rounded-sm p-6"
          >
            <div className="flex items-center gap-2 mb-6">
              <Activity size={13} className="text-[#ff6600]" />
              <span className="text-xs font-semibold tracking-widest text-foreground/25 uppercase">
                Repositories
              </span>
            </div>

            {reposLoading ? (
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                {[...Array(6)].map((_, i) => (
                  <div key={i} className="border border-white/5 rounded-sm p-4 animate-pulse">
                    <div className="h-3 w-1/2 bg-white/5 rounded mb-2" />
                    <div className="h-2 w-full bg-white/5 rounded" />
                  </div>
                ))}
              </div>
            ) : topRepos.length === 0 ? (
              <div className="flex items-center justify-center h-40 text-foreground/30 text-sm font-mono">
                Repos loading or rate limited. View on{" "}
                <a href={`https://github.com/${GITHUB_USERNAME}`} className="text-[#ff6600] ml-1">GitHub →</a>
              </div>
            ) : (
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                {topRepos.map((repo) => (
                  <motion.a
                    key={repo.id}
                    href={repo.html_url}
                    target="_blank"
                    rel="noopener noreferrer"
                    data-testid={`card-repo-${repo.id}`}
                    whileHover={{ y: -2, transition: { duration: 0.15 } }}
                    className="group border border-white/8 rounded-sm p-4 hover:border-[#ff6600]/25 transition-all duration-200"
                  >
                    <div className="flex items-start justify-between gap-2 mb-2">
                      <span className="text-sm font-semibold text-foreground group-hover:text-white transition-colors truncate">
                        {repo.name}
                      </span>
                      {repo.language && (
                        <div className="flex items-center gap-1 shrink-0">
                          <div className="w-2 h-2 rounded-full" style={{ backgroundColor: langColors[repo.language] || "#888" }} />
                          <span className="text-xs text-foreground/30 font-mono">{repo.language}</span>
                        </div>
                      )}
                    </div>
                    {repo.description && (
                      <p className="text-xs text-foreground/40 leading-relaxed mb-3 line-clamp-2">
                        {repo.description}
                      </p>
                    )}
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
