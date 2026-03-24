import { useRef, useEffect, useState } from "react";
import { motion, useInView } from "framer-motion";
import { useQuery } from "@tanstack/react-query";
import { FaGithub } from "react-icons/fa6";
import { Star, GitFork, BookOpen, Users, Activity } from "lucide-react";

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
  description: string;
  stargazers_count: number;
  forks_count: number;
  language: string;
  html_url: string;
}

const GITHUB_USERNAME = "binarytech001";

const langColors: Record<string, string> = {
  JavaScript: "#f1e05a",
  TypeScript: "#3178c6",
  Python: "#3572A5",
  HTML: "#e34c26",
  CSS: "#563d7c",
  Shell: "#89e051",
  Go: "#00ADD8",
  Rust: "#dea584",
};

function StatCard({ icon: Icon, label, value }: { icon: React.ComponentType<{ size?: number; className?: string }>; label: string; value: number | string }) {
  return (
    <div
      className="border border-white/8 p-5 rounded-sm"
      data-testid={`stat-github-${label.toLowerCase().replace(/\s+/g, "-")}`}
    >
      <div className="flex items-center gap-2 mb-2">
        <Icon size={14} className="text-[#ff6600]" />
        <span className="text-xs font-semibold tracking-wider text-foreground/30 uppercase">{label}</span>
      </div>
      <div className="text-2xl font-bold font-mono text-foreground">{value}</div>
    </div>
  );
}

function LanguageBar({ languages }: { languages: Record<string, number> }) {
  const total = Object.values(languages).reduce((a, b) => a + b, 0);
  if (total === 0) return null;

  return (
    <div>
      <span className="text-xs font-semibold tracking-wider text-foreground/30 uppercase mb-3 block">
        Top Languages
      </span>
      <div className="flex rounded-sm overflow-hidden h-2 mb-3">
        {Object.entries(languages).map(([lang, count]) => (
          <div
            key={lang}
            style={{
              width: `${(count / total) * 100}%`,
              backgroundColor: langColors[lang] || "#666",
            }}
          />
        ))}
      </div>
      <div className="flex flex-wrap gap-3">
        {Object.entries(languages).map(([lang, count]) => (
          <div key={lang} className="flex items-center gap-1.5">
            <div className="w-2 h-2 rounded-full" style={{ backgroundColor: langColors[lang] || "#666" }} />
            <span className="text-xs text-foreground/50 font-mono">{lang}</span>
            <span className="text-xs text-foreground/30 font-mono">{Math.round((count / total) * 100)}%</span>
          </div>
        ))}
      </div>
    </div>
  );
}

export default function GitHub() {
  const sectionRef = useRef<HTMLElement>(null);
  const isInView = useInView(sectionRef, { once: true, margin: "-100px" });

  const { data: user, isLoading: userLoading } = useQuery<GitHubUser>({
    queryKey: ["/github/user"],
    queryFn: () =>
      fetch(`https://api.github.com/users/${GITHUB_USERNAME}`).then((r) => r.json()),
    staleTime: 1000 * 60 * 10,
  });

  const { data: repos, isLoading: reposLoading } = useQuery<GitHubRepo[]>({
    queryKey: ["/github/repos"],
    queryFn: () =>
      fetch(`https://api.github.com/users/${GITHUB_USERNAME}/repos?sort=stars&per_page=6`).then((r) => r.json()),
    staleTime: 1000 * 60 * 10,
  });

  const reposArray = Array.isArray(repos) ? repos : [];
  const topRepos = reposArray.filter((r) => r.description).slice(0, 4);

  const langCounts: Record<string, number> = {};
  reposArray.forEach((repo) => {
    if (repo.language) langCounts[repo.language] = (langCounts[repo.language] || 0) + 1;
  });
  const topLangs = Object.fromEntries(
    Object.entries(langCounts).sort(([, a], [, b]) => b - a).slice(0, 5)
  );

  return (
    <section ref={sectionRef} id="github" className="py-32 px-6 md:px-12 lg:px-24">
      <div className="max-w-7xl mx-auto">
        <motion.div
          initial={{ opacity: 0, x: -30 }}
          animate={isInView ? { opacity: 1, x: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="mb-16"
        >
          <span className="section-label">Open Source Activity</span>
          <div className="w-8 h-0.5 bg-[#ff6600] mt-3 mb-6" />
          <h2 className="text-3xl md:text-4xl font-bold text-foreground max-w-xl leading-tight">
            Shipping in the{" "}
            <span className="font-serif italic text-[#ff6600]">open</span>
          </h2>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="border border-white/8 rounded-sm p-6"
          >
            <div className="flex items-center gap-3 mb-6">
              <FaGithub size={20} className="text-foreground/60" />
              <div>
                {userLoading ? (
                  <div className="h-4 w-24 bg-white/5 rounded animate-pulse" />
                ) : (
                  <div className="font-semibold text-foreground">{user?.name || GITHUB_USERNAME}</div>
                )}
                <div className="text-xs text-foreground/40 font-mono">@{GITHUB_USERNAME}</div>
              </div>
            </div>

            <div className="grid grid-cols-2 gap-3 mb-6">
              <StatCard icon={BookOpen} label="Repos" value={userLoading ? "—" : user?.public_repos ?? 0} />
              <StatCard icon={Users} label="Followers" value={userLoading ? "—" : user?.followers ?? 0} />
            </div>

            {user?.bio && (
              <p className="text-sm text-foreground/50 leading-relaxed mb-6">{user.bio}</p>
            )}

            <LanguageBar languages={topLangs} />

            <a
              href={`https://github.com/${GITHUB_USERNAME}`}
              target="_blank"
              rel="noopener noreferrer"
              data-testid="link-github-profile"
              className="mt-6 flex items-center gap-2 text-xs font-medium text-[#ff6600]/70 hover:text-[#ff6600] transition-colors"
            >
              <FaGithub size={12} />
              View full profile
            </a>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="lg:col-span-2 border border-white/8 rounded-sm p-6"
          >
            <div className="flex items-center gap-2 mb-6">
              <Activity size={14} className="text-[#ff6600]" />
              <span className="text-xs font-semibold tracking-wider text-foreground/30 uppercase">
                Top Repositories
              </span>
            </div>

            {reposLoading ? (
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                {[1, 2, 3, 4].map((i) => (
                  <div key={i} className="border border-white/5 rounded-sm p-4 animate-pulse">
                    <div className="h-3 w-32 bg-white/5 rounded mb-2" />
                    <div className="h-2 w-full bg-white/5 rounded" />
                  </div>
                ))}
              </div>
            ) : (
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                {topRepos.map((repo) => (
                  <a
                    key={repo.id}
                    href={repo.html_url}
                    target="_blank"
                    rel="noopener noreferrer"
                    data-testid={`card-repo-${repo.id}`}
                    className="group border border-white/8 rounded-sm p-4 hover:border-[#ff6600]/30 transition-all duration-200 hover-elevate"
                  >
                    <div className="flex items-start justify-between gap-2 mb-2">
                      <span className="text-sm font-semibold text-foreground group-hover:text-white transition-colors truncate">
                        {repo.name}
                      </span>
                      {repo.language && (
                        <div className="flex items-center gap-1 shrink-0">
                          <div
                            className="w-2 h-2 rounded-full"
                            style={{ backgroundColor: langColors[repo.language] || "#666" }}
                          />
                          <span className="text-xs text-foreground/40 font-mono">{repo.language}</span>
                        </div>
                      )}
                    </div>
                    {repo.description && (
                      <p className="text-xs text-foreground/45 leading-relaxed mb-3 line-clamp-2">
                        {repo.description}
                      </p>
                    )}
                    <div className="flex items-center gap-4">
                      <div className="flex items-center gap-1 text-foreground/30">
                        <Star size={12} />
                        <span className="text-xs font-mono">{repo.stargazers_count}</span>
                      </div>
                      <div className="flex items-center gap-1 text-foreground/30">
                        <GitFork size={12} />
                        <span className="text-xs font-mono">{repo.forks_count}</span>
                      </div>
                    </div>
                  </a>
                ))}
              </div>
            )}

            <div className="mt-6 pt-6 border-t border-white/5">
              <div className="flex items-center gap-3">
                <div className="w-2 h-2 rounded-full bg-green-400 animate-pulse" />
                <span className="text-xs text-foreground/40 font-mono">
                  Actively contributing · Building in public
                </span>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
