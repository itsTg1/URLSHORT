import React, { useState } from "react";
import axios from "axios";
import { Copy, Link as LinkIcon, Zap, CheckCircle } from "lucide-react";
import { useNavigate } from "react-router-dom";

const URLShortener = () => {
  const [fullUrl, setFullUrl] = useState("");
  const [shortId, setShortId] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [copied, setCopied] = useState(false);
  const navigate = useNavigate();
  const base=import.meta.env.VITE_BASE_URL;
 

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!fullUrl.trim()) return;

    setIsLoading(true);
    try {
      const res = await axios.post(`${base}/api/url/shorten`, {
        fullUrl,
      });

      if (res.data?.shortId) {
        setShortId(res.data.shortId);
      } else if (res.data?.shortUrl) {
        const id = res.data.shortUrl.split("/").pop();
        setShortId(id);
      } else {
        throw new Error("Invalid backend response");
      }
    } catch (error) {
      alert(error.response?.data?.message || "Please try again later.");
    } finally {
      setIsLoading(false);
    }
  };

  const shortUrl = shortId ? `${base}/${shortId}` : "";

  const copyToClipboard = async () => {
    if (!shortUrl) return;
    try {
      await navigator.clipboard.writeText(shortUrl);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch {
      alert("Failed to copy. Please copy manually.");
    }
  };

  const features = [
    {
      icon: Zap,
      title: "Lightning Fast",
      description: "Shorten URLs instantly with our optimized service",
    },
    {
      icon: LinkIcon,
      title: "Clean Links",
      description: "Get beautiful, easy-to-share shortened URLs",
    },
    {
      icon: Copy,
      title: "Easy Sharing",
      description: "Copy and share your links with just one click",
    },
  ];

  return (
    <div className="min-h-screen bg-black relative">
      <div className="absolute top-4 right-4">
        <button
          onClick={() => navigate("/admin")}
          className="bg-purple-800 hover:bg-purple-600 text-white px-4 py-2 rounded-lg transition-all"
        >
          Admin
        </button>
      </div>

      <div className="container mx-auto px-4 py-12">
        <div className="text-center mb-12">
          <div className="flex items-center justify-center mb-6">
            <div className="p-3 rounded-full bg-white">
              <LinkIcon className="h-8 w-8" />
            </div>
          </div>
          <h1 className="text-5xl md:text-6xl font-bold text-white mb-6 leading-tight">
            Shorten Your{" "}
            <span className="bg-gradient-to-r from-white to-white/80 bg-clip-text text-transparent">
              Links
            </span>
          </h1>
          <p className="text-xl text-white/80 mb-8 max-w-2xl mx-auto leading-relaxed">
            Transform long, complex URLs into short, shareable links instantly.
            Simple, fast, and reliable URL shortening service.
          </p>
        </div>

        <div className="max-w-4xl mx-auto animate-scale-in">
          <div className="bg-transparent rounded-xl">
            <div className="p-8">
              <form onSubmit={handleSubmit} className="space-y-6">
                <div className="flex flex-col md:flex-row gap-4">
                  <div className="flex-1">
                    <input
                      type="url"
                      value={fullUrl}
                      onChange={(e) => setFullUrl(e.target.value)}
                      placeholder="Enter your long URL here..."
                      className="w-full bg-background/50 border border-border/50 text-lg px-4 py-3 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary"
                      required
                    />
                  </div>
                  <button
                    type="submit"
                    disabled={isLoading}
                    className="md:w-auto w-full flex items-center justify-center gap-2 px-6 py-3 rounded-lg bg-purple-800 hover:bg-purple-600 transition-all text-white"
                  >
                    {isLoading ? (
                      <>
                        <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full" />
                        Shortening...
                      </>
                    ) : (
                      <>
                        <Zap className="h-5 w-5" />
                        Shorten URL
                      </>
                    )}
                  </button>
                </div>
              </form>

              {shortUrl && (
                <div className="mt-8 border-t border-border/20 bg-white p-8 rounded-lg">
                  <div className="flex items-center gap-2 mb-4">
                    <CheckCircle className="h-5 w-5 text-green-500" />
                    <span className="text-sm font-medium text-muted-foreground">
                      Your shortened URL is ready!
                    </span>
                  </div>

                  <div className="rounded-lg p-4 border border-border/20">
                    <div className="flex items-center justify-between gap-4">
                      <div className="flex-1 min-w-0">
                        <p className="text-sm text-muted-foreground mb-1">
                          Short URL:
                        </p>
                        <a
                          href={shortUrl}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="font-medium text-lg break-all transition-colors"
                        >
                          {shortUrl}
                        </a>
                      </div>
                      <button
                        onClick={copyToClipboard}
                        className="flex items-center gap-1 px-3 py-1 rounded-lg"
                      >
                        {copied ? (
                          <>
                            <CheckCircle className="h-4 w-4" />
                            Copied!
                          </>
                        ) : (
                          <>
                            <Copy className="h-4 w-4" />
                            Copy
                          </>
                        )}
                      </button>
                    </div>
                  </div>
                </div>
              )}
            </div>
          </div>

          <div className="grid md:grid-cols-3 gap-6 mt-12">
            {features.map((feature, index) => (
              <div
                key={index}
                className="bg-zinc-700 transition-all duration-300 hover:transform hover:scale-105 rounded-xl"
              >
                <div className="p-6 text-center">
                  <div className="p-3 rounded-full bg-primary/10 w-fit mx-auto mb-4">
                    <feature.icon className="h-6 w-6 text-white" />
                  </div>
                  <h3 className="text-lg font-semibold text-white mb-2">
                    {feature.title}
                  </h3>
                  <p className="text-white/70 text-sm">{feature.description}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default URLShortener;
