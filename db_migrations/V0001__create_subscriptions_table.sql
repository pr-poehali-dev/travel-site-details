CREATE TABLE IF NOT EXISTS t_p92862893_travel_site_details.radar_subscriptions (
    id SERIAL PRIMARY KEY,
    user_email VARCHAR(255) NOT NULL,
    payment_id VARCHAR(255) UNIQUE NOT NULL,
    status VARCHAR(50) NOT NULL DEFAULT 'pending',
    amount DECIMAL(10, 2) NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    expires_at TIMESTAMP,
    payment_method VARCHAR(50),
    payment_data JSONB
);

CREATE INDEX idx_user_email ON t_p92862893_travel_site_details.radar_subscriptions(user_email);
CREATE INDEX idx_payment_id ON t_p92862893_travel_site_details.radar_subscriptions(payment_id);
CREATE INDEX idx_status ON t_p92862893_travel_site_details.radar_subscriptions(status);
