-- Ensure the uuid-ossp extension is enabled
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

-- 1. User Management Tables
CREATE TABLE IF NOT EXISTS wheelie.users (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    full_name VARCHAR(255) NOT NULL,
    email VARCHAR(255) UNIQUE NOT NULL,
    phone_number VARCHAR(20) NULL,
    profile_picture VARCHAR(500) NULL, -- Ảnh đại diện

    is_deleted BOOLEAN DEFAULT FALSE,
    created_user UUID NOT NULL,
    created_date TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_user UUID NULL,
    updated_date TIMESTAMP NULL
);

CREATE TABLE IF NOT EXISTS wheelie.user_auth (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    user_id UUID NOT NULL,
    auth_provider VARCHAR(50) NOT NULL, -- 'local', 'google', 'facebook'
    auth_provider_id VARCHAR(255) NULL, -- ID từ Google/Facebook (nếu có)
    password_hash VARCHAR(255) NULL, -- Chỉ dùng nếu auth_provider = 'local'

    is_deleted BOOLEAN DEFAULT FALSE,
    created_user UUID NOT NULL,
    created_date TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_user UUID NULL,
    updated_date TIMESTAMP NULL,

    UNIQUE(user_id, auth_provider) -- Một user chỉ có 1 tài khoản trên mỗi nền tảng
);

CREATE TABLE IF NOT EXISTS wheelie.user_roles (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    user_id UUID NOT NULL,
    role VARCHAR(50) NOT NULL, -- 'user', 'admin', 'owner'

    is_deleted BOOLEAN DEFAULT FALSE,
    created_user UUID NOT NULL,
    created_date TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_user UUID NULL,
    updated_date TIMESTAMP NULL
);

-- 2. Vehicle Management Tables
CREATE TABLE IF NOT EXISTS wheelie.vehicles (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    license_plate VARCHAR(20) UNIQUE NOT NULL, -- Biển số xe
    model_id INT NOT NULL, -- Dòng xe (Camry, SH, Exciter...)
    year INT CHECK (year >= 1900) NOT NULL, -- Năm sản xuất
    color VARCHAR(50) NOT NULL, -- Màu xe
    price_per_day DECIMAL(10,2) NOT NULL,
    location_id UUID NOT NULL,
    is_available BOOLEAN NOT NULL DEFAULT TRUE,
    vehicle_type VARCHAR(10) CHECK (vehicle_type IN ('car', 'motorbike')) NOT NULL, -- Phân biệt xe máy hay ô tô

    is_deleted BOOLEAN DEFAULT FALSE,
    created_user UUID NOT NULL,
    created_date TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_user UUID NULL,
    updated_date TIMESTAMP NULL
);

CREATE TABLE IF NOT EXISTS wheelie.vehicle_brand (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    brand_name VARCHAR(100) NOT NULL UNIQUE,
    vehicle_type VARCHAR(10) CHECK (vehicle_type IN ('car', 'motorbike')) NULL,

    is_deleted BOOLEAN DEFAULT FALSE,
    created_user UUID NOT NULL,
    created_date TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_user UUID NULL,
    updated_date TIMESTAMP NULL
);

CREATE TABLE IF NOT EXISTS wheelie.vehicle_model (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    model_name VARCHAR(100) NOT NULL,
    brand_id INT NOT NULL,
    vehicle_type VARCHAR(10) CHECK (vehicle_type IN ('car', 'motorbike')) NOT NULL,
    engine_capacity INT CHECK (engine_capacity > 0) NOT NULL, -- Dung tích động cơ (cc)
    bike_type VARCHAR(50) CHECK (bike_type IN ('scooter', 'manual', 'clutch')) NOT NULL, -- Loại xe máy (We can add car_type later)

    is_deleted BOOLEAN DEFAULT FALSE,
    created_user UUID NOT NULL,
    created_date TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_user UUID NULL,
    updated_date TIMESTAMP NULL,
    UNIQUE (model_name, brand_id) -- Đảm bảo một model không trùng trong cùng một brand
);

CREATE TABLE IF NOT EXISTS wheelie.features (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    feature_name VARCHAR(100) UNIQUE NOT NULL, -- Tên tiện ích (ví dụ: Bluetooth, Camera 360...)

    is_deleted BOOLEAN DEFAULT FALSE,
    created_user UUID NOT NULL,
    created_date TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_user UUID NULL,
    updated_date TIMESTAMP NULL
);

CREATE TABLE IF NOT EXISTS wheelie.vehicle_images (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    vehicle_id UUID NOT NULL,
    image_url VARCHAR(500) NOT NULL,

    is_deleted BOOLEAN DEFAULT FALSE,
    created_user UUID NOT NULL,
    created_date TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_user UUID NULL,
    updated_date TIMESTAMP NULL
);

-- 3. Booking Information Tables
CREATE TABLE IF NOT EXISTS wheelie.documents (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    document_name VARCHAR(100) UNIQUE NOT NULL, -- Ví dụ: GPLX, CCCD, Passport, Hộ khẩu

    is_deleted BOOLEAN DEFAULT FALSE,
    created_user UUID NOT NULL,
    created_date TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_user UUID NULL,
    updated_date TIMESTAMP NULL
);

CREATE TABLE IF NOT EXISTS wheelie.booking_documents (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    booking_id UUID NOT NULL, -- Liên kết với đơn đặt xe
    document_id INT NOT NULL, -- Liên kết với bảng documents
    verification_type VARCHAR(50) NOT NULL, -- "Đối chiếu" hoặc "Giữ lại"

    is_deleted BOOLEAN DEFAULT FALSE,
    created_user UUID NOT NULL,
    created_date TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_user UUID NULL,
    updated_date TIMESTAMP NULL
);

CREATE TABLE IF NOT EXISTS wheelie.deposits (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    deposit_type VARCHAR(100) NOT NULL,
    min_amount DECIMAL(10,2) NULL,

    is_deleted BOOLEAN DEFAULT FALSE,
    created_user UUID NOT NULL,
    created_date TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_user UUID NULL,
    updated_date TIMESTAMP NULL
);

CREATE TABLE IF NOT EXISTS wheelie.booking_deposits (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    booking_id UUID NOT NULL,
    deposit_id UUID REFERENCES deposits(id) ON DELETE CASCADE, -- ← CHANGED to UUID
    is_deleted BOOLEAN DEFAULT FALSE,
    created_user UUID NOT NULL,
    created_date TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_user UUID NULL,
    updated_date TIMESTAMP NULL
);

CREATE TABLE IF NOT EXISTS wheelie.bookings (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    customer_id UUID NOT NULL,
    vehicle_id UUID NOT NULL,
    start_date TIMESTAMP NOT NULL,
    end_date TIMESTAMP NOT NULL,
    total_price DECIMAL(10,2) NOT NULL,
    status VARCHAR(50) CHECK (status IN ('pending', 'confirmed', 'completed', 'cancelled')) DEFAULT 'pending',
    vehicle_type VARCHAR(50) NOT NULL,

    is_deleted BOOLEAN DEFAULT FALSE,
    created_user UUID NOT NULL,
    created_date TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_user UUID NULL,
    updated_date TIMESTAMP NULL
);

CREATE TABLE IF NOT EXISTS wheelie.reviews (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    booking_id UUID NOT NULL,
    reviewer_id UUID NOT NULL,
    vehicle_id UUID NOT NULL,
    rating INT CHECK (rating BETWEEN 1 AND 5),
    comment VARCHAR(1000),

    is_deleted BOOLEAN DEFAULT FALSE,
    created_user UUID NOT NULL,
    created_date TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_user UUID NULL,
    updated_date TIMESTAMP NULL
);

CREATE TABLE IF NOT EXISTS wheelie.payments (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    booking_id UUID NOT NULL,
    customer_id UUID NOT NULL,
    amount DECIMAL(10,2) NOT NULL,
    payment_method VARCHAR(50) CHECK (payment_method IN ('credit card', 'momo', 'bank transfer')),
    status VARCHAR(50) CHECK (status IN ('pending', 'completed', 'failed')),

    is_deleted BOOLEAN DEFAULT FALSE,
    created_user UUID NOT NULL,
    created_date TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_user UUID NULL,
    updated_date TIMESTAMP NULL
);

CREATE TABLE IF NOT EXISTS wheelie.booking_promotions (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    booking_id UUID NOT NULL,
    promotion_id UUID NOT NULL,

    is_deleted BOOLEAN DEFAULT FALSE,
    created_user UUID NOT NULL,
    created_date TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_user UUID NULL,
    updated_date TIMESTAMP NULL
);

-- 4. Master Data Tables
CREATE TABLE IF NOT EXISTS wheelie.promotions (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    code VARCHAR(50) UNIQUE NOT NULL,
    discount_percentage INT CHECK (discount_percentage BETWEEN 1 AND 100),
    expiration_date TIMESTAMP NOT NULL,

    is_deleted BOOLEAN DEFAULT FALSE,
    created_user UUID NOT NULL,
    created_date TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_user UUID NULL,
    updated_date TIMESTAMP NULL
);

CREATE TABLE IF NOT EXISTS wheelie.support_tickets (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    user_id UUID NOT NULL,
    subject VARCHAR(255) NOT NULL,
    message TEXT NOT NULL,
    status VARCHAR(50) CHECK (status IN ('open', 'in progress', 'closed')) DEFAULT 'open',

    is_deleted BOOLEAN DEFAULT FALSE,
    created_user UUID NOT NULL,
    created_date TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_user UUID NULL,
    updated_date TIMESTAMP NULL
);

CREATE TABLE IF NOT EXISTS wheelie.locations (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    district_id INT NOT NULL,
    address VARCHAR(255) NOT NULL,
    latitude DECIMAL(10,6) NULL,  -- Tọa độ GPS (nếu cần)
    longitude DECIMAL(10,6) NULL,   -- Tọa độ GPS (nếu cần),

    is_deleted BOOLEAN DEFAULT FALSE,
    created_user UUID NOT NULL,
    created_date TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_user UUID NULL,
    updated_date TIMESTAMP NULL
);


-- 4. Master Data Tables (continued)
CREATE TABLE IF NOT EXISTS wheelie.cities (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    city_name VARCHAR(100) UNIQUE NOT NULL,

    is_deleted BOOLEAN DEFAULT FALSE,
    created_user UUID NOT NULL,
    created_date TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_user UUID NULL,
    updated_date TIMESTAMP NULL
);

CREATE TABLE IF NOT EXISTS wheelie.districts (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    city_id INT NOT NULL,
    district_name VARCHAR(100) NOT NULL,
    UNIQUE (city_id, district_name), -- Đảm bảo không có quận trùng trong cùng một thành phố

    is_deleted BOOLEAN DEFAULT FALSE,
    created_user UUID NOT NULL,
    created_date TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_user UUID NULL,
    updated_date TIMESTAMP NULL
);

CREATE TABLE IF NOT EXISTS wheelie.late_fees (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    booking_id UUID NOT NULL,
    days_late INT NOT NULL,
    total_fee DECIMAL(10,2) NOT NULL,

    is_deleted BOOLEAN DEFAULT FALSE,
    created_user UUID NOT NULL,
    created_date TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_user UUID NULL,
    updated_date TIMESTAMP NULL
);
