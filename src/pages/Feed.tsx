import React from 'react';
import { Image as ImageIcon, Calendar, FileText, MoreHorizontal, ThumbsUp, MessageSquare, Share2, Send } from 'lucide-react';
import '../components/Layout.css'; // Reuse some styles

const Feed: React.FC = () => {
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
                            color: '#666'
                        }}>PZ</div>
                        <h3 style={{ fontSize: '16px', fontWeight: '600' }}>Preston Zen</h3>
                        <p style={{ fontSize: '12px', color: 'var(--color-text-secondary)', marginTop: '4px' }}>Software Engineer</p>
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
                        <div style={{ width: '48px', height: '48px', borderRadius: '50%', backgroundColor: '#e0e0e0', flexShrink: 0, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>PZ</div>
                        <button style={{
                            flex: 1,
                            borderRadius: '35px',
                            border: '1px solid var(--color-text-secondary)',
                            backgroundColor: 'white',
                            textAlign: 'left',
                            padding: '0 16px',
                            color: 'var(--color-text-secondary)',
                            fontWeight: '600'
                        }}>Start a post</button>
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

                {/* Feed Item */}
                <div className="card">
                    <div style={{ display: 'flex', gap: '12px', marginBottom: '12px' }}>
                        <div style={{ width: '48px', height: '48px', borderRadius: '50%', backgroundColor: '#e0e0e0', flexShrink: 0 }}></div>
                        <div>
                            <h3 style={{ fontSize: '14px', fontWeight: '600' }}>Tech Insider</h3>
                            <p style={{ fontSize: '12px', color: 'var(--color-text-secondary)' }}>1,234,567 followers</p>
                            <p style={{ fontSize: '12px', color: 'var(--color-text-secondary)' }}>2h • <span style={{ fontSize: '10px' }}>🌐</span></p>
                        </div>
                        <button style={{ marginLeft: 'auto', background: 'none', border: 'none', cursor: 'pointer' }}>
                            <MoreHorizontal size={20} color="var(--color-text-secondary)" />
                        </button>
                    </div>
                    <p style={{ fontSize: '14px', marginBottom: '12px', lineHeight: '1.5' }}>
                        The future of web development is here! Check out the latest trends in React and Cloudflare. #webdev #react #cloudflare
                    </p>
                    <div style={{ width: '100%', height: '300px', backgroundColor: '#f3f2ef', display: 'flex', alignItems: 'center', justifyContent: 'center', marginBottom: '12px' }}>
                        <span style={{ color: 'var(--color-text-secondary)' }}>Post Image Placeholder</span>
                    </div>
                    <div style={{ borderTop: '1px solid var(--color-border)', paddingTop: '8px', display: 'flex', justifyContent: 'space-between' }}>
                        <button className="btn btn-ghost" style={{ flex: 1, display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '8px' }}>
                            <ThumbsUp size={20} /> <span>Like</span>
                        </button>
                        <button className="btn btn-ghost" style={{ flex: 1, display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '8px' }}>
                            <MessageSquare size={20} /> <span>Comment</span>
                        </button>
                        <button className="btn btn-ghost" style={{ flex: 1, display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '8px' }}>
                            <Share2 size={20} /> <span>Repost</span>
                        </button>
                        <button className="btn btn-ghost" style={{ flex: 1, display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '8px' }}>
                            <Send size={20} /> <span>Send</span>
                        </button>
                    </div>
                </div>
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
        </div>
    );
};

export default Feed;
