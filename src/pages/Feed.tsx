import React, { useState, useEffect } from 'react';
import { Image as ImageIcon, Calendar, FileText, ThumbsUp, MessageSquare, Share2, Send, X } from 'lucide-react';
import '../components/Layout.css'; // Reuse some styles

interface ProfileData {
    photo_url?: string;
    headline?: string;
    name?: string;
}

interface Post {
    id: string;
    username: string;
    name: string;
    headline: string;
    photo_url: string;
    content: string;
    image_url?: string;
    likes: number;
    comments: number;
    created_at: number;
}

const Feed: React.FC = () => {
    const [profile, setProfile] = useState<ProfileData | null>(null);
    const [posts, setPosts] = useState<Post[]>([]);
    const [isCreatePostOpen, setIsCreatePostOpen] = useState(false);
    const [newPostContent, setNewPostContent] = useState('');

    const [isPosting, setIsPosting] = useState(false);

    useEffect(() => {
        const fetchProfile = async () => {
            try {
                const response = await fetch('/api/profile');
                if (response.ok) {
                    const data = await response.json();
                    setProfile(data);
                }
            } catch (error) {
                console.error("Failed to fetch profile", error);
            }
        };
        fetchProfile();
        fetchPosts();
    }, []);

    const fetchPosts = async () => {
        try {
            const response = await fetch('/api/posts');
            if (response.ok) {
                const data = await response.json();
                setPosts(data);
            }
        } catch (error) {
            console.error("Failed to fetch posts", error);
        }
    };

    const handleCreatePost = async () => {
        if (!newPostContent.trim()) return;
        setIsPosting(true);

        try {
            const response = await fetch('/api/posts', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ content: newPostContent })
            });

            if (response.ok) {
                setNewPostContent('');
                setIsCreatePostOpen(false);
                fetchPosts(); // Refresh posts
            } else {
                alert("Failed to create post");
            }
        } catch (error) {
            console.error("Failed to create post", error);
            alert("Error creating post");
        } finally {
            setIsPosting(false);
        }
    };

    const handleDeletePost = async (postId: string) => {
        if (!confirm("Are you sure you want to delete this post?")) return;

        try {
            const response = await fetch(`/api/posts/${postId}`, {
                method: 'DELETE'
            });

            if (response.ok) {
                setPosts(posts.filter(p => p.id !== postId));
            } else {
                alert("Failed to delete post");
            }
        } catch (error) {
            console.error("Failed to delete post", error);
        }
    };

    const formatTime = (timestamp: number) => {
        const now = Math.floor(Date.now() / 1000);
        const diff = now - timestamp;
        if (diff < 60) return 'Just now';
        if (diff < 3600) return `${Math.floor(diff / 60)}m`;
        if (diff < 86400) return `${Math.floor(diff / 3600)}h`;
        return `${Math.floor(diff / 86400)}d`;
    };

    return (
        <div className="container" style={{ display: 'flex', gap: '24px', paddingTop: '24px' }}>
            {/* Left Sidebar */}
            <div style={{ width: '225px', flexShrink: 0 }}>
                <div className="card" style={{ padding: 0, overflow: 'hidden' }}>
                    <div style={{ height: '56px', backgroundColor: '#a0b4b7' }}></div>
                    <div style={{ padding: '12px', textAlign: 'center', marginTop: '-30px' }}>
                        <div style={{
                            width: '72px',
                            height: '72px',
                            borderRadius: '50%',
                            backgroundColor: '#e0e0e0',
                            border: '2px solid white',
                            margin: '0 auto 12px',
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'center',
                            fontSize: '24px',
                            color: '#666',
                            overflow: 'hidden'
                        }}>
                            {profile?.photo_url ? (
                                <img src={profile.photo_url} alt="Profile" style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
                            ) : (
                                "PZ"
                            )}
                        </div>
                        <h3 style={{ fontSize: '16px', fontWeight: '600' }}>{profile?.name || "Preston Zen"}</h3>
                        <p style={{ fontSize: '12px', color: 'var(--color-text-secondary)', marginTop: '4px' }}>{profile?.headline || "Software Engineer"}</p>
                    </div>
                    <div style={{ borderTop: '1px solid var(--color-border)', padding: '12px' }}>
                        <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '12px', marginBottom: '4px' }}>
                            <span style={{ color: 'var(--color-text-secondary)' }}>Profile viewers</span>
                            <span style={{ color: 'var(--color-brand)', fontWeight: '600' }}>42</span>
                        </div>
                        <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '12px' }}>
                            <span style={{ color: 'var(--color-text-secondary)' }}>Post impressions</span>
                            <span style={{ color: 'var(--color-brand)', fontWeight: '600' }}>128</span>
                        </div>
                    </div>
                </div>
            </div>

            {/* Main Feed */}
            <div style={{ flex: 1, maxWidth: '555px' }}>
                {/* Create Post */}
                <div className="card" style={{ marginBottom: '16px' }}>
                    <div style={{ display: 'flex', gap: '12px', marginBottom: '12px' }}>
                        <div style={{ width: '48px', height: '48px', borderRadius: '50%', backgroundColor: '#e0e0e0', flexShrink: 0, display: 'flex', alignItems: 'center', justifyContent: 'center', overflow: 'hidden' }}>
                            {profile?.photo_url ? (
                                <img src={profile.photo_url} alt="Profile" style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
                            ) : (
                                "PZ"
                            )}
                        </div>
                        <button
                            onClick={() => setIsCreatePostOpen(true)}
                            style={{
                                flex: 1,
                                borderRadius: '35px',
                                border: '1px solid var(--color-text-secondary)',
                                backgroundColor: 'white',
                                textAlign: 'left',
                                padding: '0 16px',
                                color: 'var(--color-text-secondary)',
                                fontWeight: '600',
                                cursor: 'pointer'
                            }}
                        >
                            Start a post
                        </button>
                    </div>
                    <div style={{ display: 'flex', justifyContent: 'space-between', padding: '0 16px' }}>
                        <button className="btn btn-ghost" style={{ display: 'flex', alignItems: 'center', gap: '8px', color: '#378fe9' }}>
                            <ImageIcon size={20} /> <span>Media</span>
                        </button>
                        <button className="btn btn-ghost" style={{ display: 'flex', alignItems: 'center', gap: '8px', color: '#c37d16' }}>
                            <Calendar size={20} /> <span>Event</span>
                        </button>
                        <button className="btn btn-ghost" style={{ display: 'flex', alignItems: 'center', gap: '8px', color: '#e06847' }}>
                            <FileText size={20} /> <span>Write article</span>
                        </button>
                    </div>
                </div>

                {/* Posts List */}
                {posts.map(post => (
                    <div key={post.id} className="card" style={{ marginBottom: '16px' }}>
                        <div style={{ display: 'flex', gap: '12px', marginBottom: '12px' }}>
                            <div style={{ width: '48px', height: '48px', borderRadius: '50%', backgroundColor: '#e0e0e0', flexShrink: 0, overflow: 'hidden' }}>
                                {post.photo_url ? (
                                    <img src={post.photo_url} alt={post.name} style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
                                ) : (
                                    <div style={{ width: '100%', height: '100%', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>{post.name?.charAt(0)}</div>
                                )}
                            </div>
                            <div>
                                <h3 style={{ fontSize: '14px', fontWeight: '600' }}>{post.name}</h3>
                                <p style={{ fontSize: '12px', color: 'var(--color-text-secondary)' }}>{post.headline}</p>
                                <p style={{ fontSize: '12px', color: 'var(--color-text-secondary)' }}>{formatTime(post.created_at)} • <span style={{ fontSize: '10px' }}>🌐</span></p>
                            </div>
                            <div style={{ marginLeft: 'auto', position: 'relative' }}>
                                <button
                                    className="btn btn-ghost"
                                    onClick={() => handleDeletePost(post.id)}
                                    title="Delete post"
                                    style={{ padding: '4px' }}
                                >
                                    <X size={16} />
                                </button>
                            </div>
                        </div>
                        <p style={{ fontSize: '14px', marginBottom: '12px', lineHeight: '1.5' }}>
                            {post.content}
                        </p>
                        {post.image_url && (
                            <div style={{ width: '100%', marginBottom: '12px' }}>
                                <img src={post.image_url} alt="Post content" style={{ width: '100%', borderRadius: '8px' }} />
                            </div>
                        )}
                        <div style={{ borderTop: '1px solid var(--color-border)', paddingTop: '8px', display: 'flex', justifyContent: 'space-between' }}>
                            <button className="btn btn-ghost" style={{ flex: 1, display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '8px' }}>
                                <ThumbsUp size={20} /> <span>Like ({post.likes})</span>
                            </button>
                            <button className="btn btn-ghost" style={{ flex: 1, display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '8px' }}>
                                <MessageSquare size={20} /> <span>Comment ({post.comments})</span>
                            </button>
                            <button className="btn btn-ghost" style={{ flex: 1, display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '8px' }}>
                                <Share2 size={20} /> <span>Repost</span>
                            </button>
                            <button className="btn btn-ghost" style={{ flex: 1, display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '8px' }}>
                                <Send size={20} /> <span>Send</span>
                            </button>
                        </div>
                    </div>
                ))}
            </div>

            {/* Right Sidebar */}
            <div style={{ width: '300px', flexShrink: 0 }}>
                <div className="card">
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '16px' }}>
                        <h3 style={{ fontSize: '16px', fontWeight: '600' }}>LinkedTFIn News</h3>
                        <div style={{ width: '16px', height: '16px', backgroundColor: 'var(--color-text-secondary)', borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center', color: 'white', fontSize: '10px' }}>i</div>
                    </div>
                    <ul style={{ listStyle: 'none', padding: 0 }}>
                        <li style={{ marginBottom: '12px' }}>
                            <div style={{ fontSize: '14px', fontWeight: '600' }}>Top news stories</div>
                            <div style={{ fontSize: '12px', color: 'var(--color-text-secondary)' }}>Top news • 10,934 readers</div>
                        </li>
                        <li style={{ marginBottom: '12px' }}>
                            <div style={{ fontSize: '14px', fontWeight: '600' }}>Tech hiring stabilizes</div>
                            <div style={{ fontSize: '12px', color: 'var(--color-text-secondary)' }}>1d ago • 5,211 readers</div>
                        </li>
                        <li style={{ marginBottom: '12px' }}>
                            <div style={{ fontSize: '14px', fontWeight: '600' }}>New AI regulations</div>
                            <div style={{ fontSize: '12px', color: 'var(--color-text-secondary)' }}>12h ago • 8,122 readers</div>
                        </li>
                    </ul>
                </div>
            </div>

            {/* Create Post Modal */}
            {isCreatePostOpen && (
                <div style={{
                    position: 'fixed',
                    top: 0,
                    left: 0,
                    right: 0,
                    bottom: 0,
                    backgroundColor: 'rgba(0,0,0,0.7)',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    zIndex: 1000
                }}>
                    <div style={{
                        backgroundColor: 'white',
                        borderRadius: '8px',
                        width: '100%',
                        maxWidth: '600px',
                        display: 'flex',
                        flexDirection: 'column',
                        maxHeight: '90vh'
                    }}>
                        <div style={{
                            padding: '16px 24px',
                            borderBottom: '1px solid var(--color-border)',
                            display: 'flex',
                            justifyContent: 'space-between',
                            alignItems: 'center'
                        }}>
                            <h2 style={{ fontSize: '20px', fontWeight: '600', margin: 0 }}>Create a post</h2>
                            <button onClick={() => setIsCreatePostOpen(false)} style={{ background: 'none', border: 'none', cursor: 'pointer' }}>
                                <X size={24} />
                            </button>
                        </div>
                        <div style={{ padding: '24px', flex: 1 }}>
                            <div style={{ display: 'flex', gap: '12px', marginBottom: '16px' }}>
                                <div style={{ width: '48px', height: '48px', borderRadius: '50%', backgroundColor: '#e0e0e0', overflow: 'hidden' }}>
                                    {profile?.photo_url ? (
                                        <img src={profile.photo_url} alt="Profile" style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
                                    ) : (
                                        <div style={{ width: '100%', height: '100%', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>PZ</div>
                                    )}
                                </div>
                                <div>
                                    <h3 style={{ fontSize: '16px', fontWeight: '600' }}>{profile?.name || "Preston Zen"}</h3>
                                    <button style={{
                                        border: '1px solid var(--color-text-secondary)',
                                        borderRadius: '16px',
                                        padding: '2px 12px',
                                        background: 'none',
                                        fontSize: '12px',
                                        fontWeight: '600',
                                        color: 'var(--color-text-secondary)',
                                        marginTop: '4px'
                                    }}>Anyone</button>
                                </div>
                            </div>
                            <textarea
                                placeholder="What do you want to talk about?"
                                value={newPostContent}
                                onChange={(e) => setNewPostContent(e.target.value)}
                                style={{
                                    width: '100%',
                                    minHeight: '150px',
                                    border: 'none',
                                    resize: 'none',
                                    fontSize: '16px',
                                    fontFamily: 'inherit',
                                    outline: 'none'
                                }}
                            />
                        </div>
                        <div style={{
                            padding: '16px 24px',
                            borderTop: '1px solid var(--color-border)',
                            display: 'flex',
                            justifyContent: 'flex-end'
                        }}>
                            <button
                                onClick={handleCreatePost}
                                disabled={!newPostContent.trim() || isPosting}
                                className="btn btn-primary"
                                style={{ opacity: !newPostContent.trim() || isPosting ? 0.5 : 1 }}
                            >
                                {isPosting ? 'Posting...' : 'Post'}
                            </button>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
};

export default Feed;
