import { AppDataSource } from './pg.data-source';
import { Product } from '@/shared/models/entities';

const products = [
    {
        title: 'MacBook Pro 14" M3',
        description: 'Apple MacBook Pro with M3 chip, 16GB unified memory, 512GB SSD. Features stunning Liquid Retina XDR display.',
        price: 1999.00,
        rating: 4.9,
        thumbnail: 'https://images.unsplash.com/photo-1517336714731-489689fd1ca8?w=500',
        images: ['https://images.unsplash.com/photo-1517336714731-489689fd1ca8?w=800', 'https://images.unsplash.com/photo-1611186871348-b1ce696e52c9?w=800'],
        category: 'laptops',
        stock: 15,
        brand: 'Apple',
        return_policy: '14 days return policy with original packaging',
        shipping_info: 'Free 2-day shipping',
        warranty_info: '1 year Apple limited warranty',
        dimension: { width: 12.3, height: 8.7, depth: 0.6 }
    },
    {
        title: 'Dell XPS 15',
        description: 'High-performance laptop with Intel i7 processor, 16GB RAM, and 512GB SSD. Perfect for professionals.',
        price: 1499.99,
        rating: 4.7,
        thumbnail: 'https://images.unsplash.com/photo-1593642632823-8f785ba67e45?w=500',
        images: ['https://images.unsplash.com/photo-1593642632823-8f785ba67e45?w=800'],
        category: 'laptops',
        stock: 25,
        brand: 'Dell',
        return_policy: '30 days return policy',
        shipping_info: 'Free shipping on orders over $50',
        warranty_info: '1 year manufacturer warranty',
        dimension: { width: 14.0, height: 9.0, depth: 0.7 }
    },
    {
        title: 'Nike Air Max 270 Men\'s Shoes',
        description: 'Comfortable running shoes with Air Max cushioning. Breathable mesh upper and durable rubber outsole.',
        price: 149.99,
        rating: 4.6,
        thumbnail: 'https://images.unsplash.com/photo-1542291026-7eec264c27ff?w=500',
        images: ['https://images.unsplash.com/photo-1542291026-7eec264c27ff?w=800', 'https://images.unsplash.com/photo-1606107557195-0e29a4b5b4aa?w=800'],
        category: 'mens-shoes',
        stock: 80,
        brand: 'Nike',
        return_policy: '30 days return with receipt',
        shipping_info: 'Standard shipping 5-7 days',
        warranty_info: '90 days manufacturer warranty',
        dimension: { width: 11.0, height: 4.5, depth: 4.0 }
    },
    {
        title: 'Adidas Ultraboost Running Shoes',
        description: 'Premium running shoes with boost cushioning technology. Lightweight and responsive.',
        price: 179.99,
        rating: 4.8,
        thumbnail: 'https://images.unsplash.com/photo-1608231387042-66d1773070a5?w=500',
        images: ['https://images.unsplash.com/photo-1608231387042-66d1773070a5?w=800'],
        category: 'mens-shoes',
        stock: 60,
        brand: 'Adidas',
        return_policy: '30 days return policy',
        shipping_info: 'Free shipping',
        warranty_info: '6 months warranty',
        dimension: { width: 11.5, height: 4.5, depth: 4.2 }
    },
    {
        title: 'Samsung Galaxy S24 Ultra 256GB',
        description: 'Flagship smartphone with 200MP camera, S Pen, and AI features. 6.8" Dynamic AMOLED display.',
        price: 1199.99,
        rating: 4.7,
        thumbnail: 'https://images.unsplash.com/photo-1610945415295-d9bbf067e59c?w=500',
        images: ['https://images.unsplash.com/photo-1610945415295-d9bbf067e59c?w=800', 'https://images.unsplash.com/photo-1511707171634-5f897ff02aa9?w=800'],
        category: 'smartphones',
        stock: 45,
        brand: 'Samsung',
        return_policy: '15 days return policy',
        shipping_info: 'Free express delivery',
        warranty_info: '1 year Samsung warranty',
        dimension: { width: 6.4, height: 3.1, depth: 0.35 }
    },
    {
        title: 'iPhone 15 Pro',
        description: 'Latest iPhone with A17 Pro chip, 128GB storage, and advanced camera system.',
        price: 999.00,
        rating: 4.8,
        thumbnail: 'https://images.unsplash.com/photo-1592286927505-fa0d6e1b7c24?w=500',
        images: ['https://images.unsplash.com/photo-1592286927505-fa0d6e1b7c24?w=800'],
        category: 'smartphones',
        stock: 50,
        brand: 'Apple',
        return_policy: '14 days return policy',
        shipping_info: 'Free express shipping',
        warranty_info: '1 year Apple warranty',
        dimension: { width: 6.1, height: 3.0, depth: 0.3 }
    },
    {
        title: 'Ray-Ban Classic Aviator Sunglasses',
        description: 'Iconic aviator design with UV protection. Gold frame with green classic G-15 lenses.',
        price: 169.00,
        rating: 4.8,
        thumbnail: 'https://images.unsplash.com/photo-1511499767150-a48a237f0083?w=500',
        images: ['https://images.unsplash.com/photo-1511499767150-a48a237f0083?w=800', 'https://images.unsplash.com/photo-1473496169904-658ba7c44d8a?w=800'],
        category: 'sunglasses',
        stock: 120,
        brand: 'Ray-Ban',
        return_policy: '30 days money-back guarantee',
        shipping_info: 'Standard shipping 3-5 days',
        warranty_info: '2 years warranty against defects',
        dimension: { width: 5.5, height: 2.0, depth: 0.5 }
    },
    {
        title: 'Oakley Sport Sunglasses',
        description: 'High-performance sports sunglasses with polarized lenses. Perfect for outdoor activities.',
        price: 189.00,
        rating: 4.7,
        thumbnail: 'https://images.unsplash.com/photo-1572635196237-14b3f281503f?w=500',
        images: ['https://images.unsplash.com/photo-1572635196237-14b3f281503f?w=800'],
        category: 'sunglasses',
        stock: 95,
        brand: 'Oakley',
        return_policy: '30 days return policy',
        shipping_info: 'Free shipping',
        warranty_info: '2 years warranty',
        dimension: { width: 5.8, height: 2.2, depth: 0.6 }
    },
    {
        title: 'Luxury Diver Watch - Automatic',
        description: 'Premium automatic watch with date display, water resistant to 300m. Stainless steel case and bracelet.',
        price: 8999.00,
        rating: 4.9,
        thumbnail: 'https://images.unsplash.com/photo-1523170335258-f5ed11844a49?w=500',
        images: ['https://images.unsplash.com/photo-1523170335258-f5ed11844a49?w=800', 'https://images.unsplash.com/photo-1524592094714-0f0654e20314?w=800'],
        category: 'mens-watches',
        stock: 5,
        brand: 'Luxury Timepieces',
        return_policy: '7 days inspection period',
        shipping_info: 'Insured express shipping',
        warranty_info: '5 years international warranty',
        dimension: { width: 1.8, height: 1.8, depth: 0.5 }
    },
    {
        title: 'Casio G-Shock Digital Watch',
        description: 'Durable digital watch with shock resistance. Water resistant to 200m.',
        price: 99.99,
        rating: 4.6,
        thumbnail: 'https://images.unsplash.com/photo-1587836374615-91d3c4da9d19?w=500',
        images: ['https://images.unsplash.com/photo-1587836374615-91d3c4da9d19?w=800'],
        category: 'mens-watches',
        stock: 150,
        brand: 'Casio',
        return_policy: '30 days return policy',
        shipping_info: 'Standard shipping',
        warranty_info: '2 years warranty',
        dimension: { width: 1.9, height: 1.9, depth: 0.6 }
    },
    {
        title: 'Classic Flap Leather Handbag',
        description: 'Elegant leather handbag with chain strap. Quilted design with signature logo. Perfect for any occasion.',
        price: 4500.00,
        rating: 4.8,
        thumbnail: 'https://images.unsplash.com/photo-1584917865442-de89df76afd3?w=500',
        images: ['https://images.unsplash.com/photo-1584917865442-de89df76afd3?w=800', 'https://images.unsplash.com/photo-1590874103328-eac38a683ce7?w=800'],
        category: 'womens-bags',
        stock: 12,
        brand: 'Premium Fashion',
        return_policy: '14 days return in original condition',
        shipping_info: 'Free luxury packaging and shipping',
        warranty_info: '1 year craftsmanship warranty',
        dimension: { width: 10.0, height: 6.5, depth: 3.0 }
    },
    {
        title: 'Leather Tote Bag',
        description: 'Spacious leather tote bag perfect for daily use. Multiple compartments and durable construction.',
        price: 189.99,
        rating: 4.5,
        thumbnail: 'https://images.unsplash.com/photo-1548036328-c9fa89d128fa?w=500',
        images: ['https://images.unsplash.com/photo-1548036328-c9fa89d128fa?w=800'],
        category: 'womens-bags',
        stock: 45,
        brand: 'Modern Essentials',
        return_policy: '30 days return policy',
        shipping_info: 'Free shipping',
        warranty_info: '1 year warranty',
        dimension: { width: 13.0, height: 11.0, depth: 5.0 }
    },
    {
        title: 'iPad Pro 12.9" M2 Chip 256GB',
        description: 'Ultimate iPad experience with M2 chip, Liquid Retina XDR display, and Apple Pencil support.',
        price: 1099.00,
        rating: 4.8,
        thumbnail: 'https://images.unsplash.com/photo-1544244015-0df4b3ffc6b0?w=500',
        images: ['https://images.unsplash.com/photo-1544244015-0df4b3ffc6b0?w=800', 'https://images.unsplash.com/photo-1561154464-82e9adf32764?w=800'],
        category: 'tablets',
        stock: 30,
        brand: 'Apple',
        return_policy: '14 days return policy',
        shipping_info: 'Free 2-day delivery',
        warranty_info: '1 year Apple warranty',
        dimension: { width: 11.0, height: 8.5, depth: 0.25 }
    },
    {
        title: 'Samsung Galaxy Tab S9',
        description: 'Premium Android tablet with S Pen included. 11" display and powerful performance.',
        price: 799.99,
        rating: 4.6,
        thumbnail: 'https://images.unsplash.com/photo-1585790050230-5dd28404f099?w=500',
        images: ['https://images.unsplash.com/photo-1585790050230-5dd28404f099?w=800'],
        category: 'tablets',
        stock: 40,
        brand: 'Samsung',
        return_policy: '15 days return policy',
        shipping_info: 'Free shipping',
        warranty_info: '1 year Samsung warranty',
        dimension: { width: 10.0, height: 6.5, depth: 0.23 }
    },
    {
        title: 'Classic Leather Motorcycle Jacket',
        description: 'Genuine leather jacket with armor protection. Multiple pockets and adjustable waist. Built for riders.',
        price: 399.99,
        rating: 4.7,
        thumbnail: 'https://images.unsplash.com/photo-1551028719-00167b16eac5?w=500',
        images: ['https://images.unsplash.com/photo-1551028719-00167b16eac5?w=800', 'https://images.unsplash.com/photo-1521223890158-f9f7c3d5d504?w=800'],
        category: 'motorcycle',
        stock: 25,
        brand: 'Harley-Davidson',
        return_policy: '30 days exchange policy',
        shipping_info: 'Standard shipping 5-7 business days',
        warranty_info: '1 year warranty on zippers and hardware',
        dimension: { width: 22.0, height: 26.0, depth: 2.0 }
    },
    {
        title: 'Motorcycle Helmet Full Face',
        description: 'DOT approved full face helmet with anti-fog visor. Lightweight and comfortable.',
        price: 199.99,
        rating: 4.8,
        thumbnail: 'https://images.unsplash.com/photo-1558980664-769d59546b3d?w=500',
        images: ['https://images.unsplash.com/photo-1558980664-769d59546b3d?w=800'],
        category: 'motorcycle',
        stock: 50,
        brand: 'Shoei',
        return_policy: '14 days return policy',
        shipping_info: 'Free shipping',
        warranty_info: '1 year warranty',
        dimension: { width: 12.0, height: 13.0, depth: 14.0 }
    },
    {
        title: 'Men\'s Classic Fit Oxford Shirt',
        description: 'Premium cotton oxford shirt. Button-down collar, long sleeves. Perfect for business or casual wear.',
        price: 89.99,
        rating: 4.5,
        thumbnail: 'https://images.unsplash.com/photo-1602810318383-e386cc2a3ccf?w=500',
        images: ['https://images.unsplash.com/photo-1602810318383-e386cc2a3ccf?w=800', 'https://images.unsplash.com/photo-1596755094514-f87e34085b2c?w=800'],
        category: 'mens-shirts',
        stock: 150,
        brand: 'Ralph Lauren',
        return_policy: '60 days return policy',
        shipping_info: 'Free shipping on orders over $100',
        warranty_info: '90 days quality guarantee',
        dimension: { width: 18.0, height: 28.0, depth: 1.0 }
    },
    {
        title: 'Casual Linen Shirt',
        description: 'Breathable linen shirt perfect for summer. Relaxed fit and comfortable.',
        price: 49.99,
        rating: 4.4,
        thumbnail: 'https://images.unsplash.com/photo-1596755094514-f87e34085b2c?w=500',
        images: ['https://images.unsplash.com/photo-1596755094514-f87e34085b2c?w=800'],
        category: 'mens-shirts',
        stock: 200,
        brand: 'H&M',
        return_policy: '30 days return policy',
        shipping_info: 'Standard shipping',
        warranty_info: '60 days quality guarantee',
        dimension: { width: 17.0, height: 27.0, depth: 0.8 }
    },
    {
        title: 'Revitalift Anti-Aging Skincare Set',
        description: 'Complete skincare routine with cleanser, serum, and moisturizer. Reduces wrinkles and firms skin.',
        price: 59.99,
        rating: 4.6,
        thumbnail: 'https://images.unsplash.com/photo-1556228578-0d85b1a4d571?w=500',
        images: ['https://images.unsplash.com/photo-1556228578-0d85b1a4d571?w=800', 'https://images.unsplash.com/photo-1570194065650-d99fb4bedf0a?w=800'],
        category: 'skin-care',
        stock: 200,
        brand: 'L\'Oreal Paris',
        return_policy: '30 days satisfaction guarantee',
        shipping_info: 'Standard shipping 3-5 days',
        warranty_info: 'Quality guaranteed - replace if defective',
        dimension: { width: 6.0, height: 8.0, depth: 3.0 }
    },
    {
        title: 'Vitamin C Serum',
        description: 'Brightening vitamin C serum for radiant skin. Reduces dark spots and evens skin tone.',
        price: 34.99,
        rating: 4.7,
        thumbnail: 'https://images.unsplash.com/photo-1620916566398-39f1143ab7be?w=500',
        images: ['https://images.unsplash.com/photo-1620916566398-39f1143ab7be?w=800'],
        category: 'skin-care',
        stock: 180,
        brand: 'The Ordinary',
        return_policy: '30 days return policy',
        shipping_info: 'Free shipping on orders over $50',
        warranty_info: 'Satisfaction guaranteed',
        dimension: { width: 2.5, height: 4.0, depth: 2.5 }
    },
    {
        title: 'Floral Summer Dress',
        description: 'Beautiful floral print summer dress. Lightweight and comfortable for warm weather.',
        price: 79.99,
        rating: 4.5,
        thumbnail: 'https://images.unsplash.com/photo-1595777457583-95e059d581b8?w=500',
        images: ['https://images.unsplash.com/photo-1595777457583-95e059d581b8?w=800'],
        category: 'womens-dresses',
        stock: 100,
        brand: 'Zara',
        return_policy: '30 days return policy',
        shipping_info: 'Standard shipping 5-7 days',
        warranty_info: 'Quality guarantee',
        dimension: { width: 16.0, height: 40.0, depth: 1.0 }
    },
    {
        title: 'Elegant Evening Gown',
        description: 'Stunning evening gown perfect for formal events. Available in multiple colors.',
        price: 299.99,
        rating: 4.8,
        thumbnail: 'https://images.unsplash.com/photo-1566174053879-31528523f8ae?w=500',
        images: ['https://images.unsplash.com/photo-1566174053879-31528523f8ae?w=800'],
        category: 'womens-dresses',
        stock: 35,
        brand: 'Elegant Couture',
        return_policy: '14 days return policy',
        shipping_info: 'Free shipping',
        warranty_info: '30 days quality guarantee',
        dimension: { width: 16.0, height: 50.0, depth: 1.5 }
    },
    {
        title: 'Gold Chain Necklace',
        description: 'Elegant gold plated chain necklace. Perfect for everyday wear or special occasions.',
        price: 149.99,
        rating: 4.6,
        thumbnail: 'https://images.unsplash.com/photo-1599643478518-a784e5dc4c8f?w=500',
        images: ['https://images.unsplash.com/photo-1599643478518-a784e5dc4c8f?w=800'],
        category: 'womens-jewellery',
        stock: 75,
        brand: 'Pandora',
        return_policy: '30 days return policy',
        shipping_info: 'Free insured shipping',
        warranty_info: '1 year warranty',
        dimension: { width: 2.0, height: 2.0, depth: 0.2 }
    },
    {
        title: 'Diamond Stud Earrings',
        description: 'Classic diamond stud earrings in sterling silver. Timeless elegance.',
        price: 199.99,
        rating: 4.9,
        thumbnail: 'https://images.unsplash.com/photo-1535632066927-ab7c9ab60908?w=500',
        images: ['https://images.unsplash.com/photo-1535632066927-ab7c9ab60908?w=800'],
        category: 'womens-jewellery',
        stock: 60,
        brand: 'Tiffany & Co',
        return_policy: '14 days return policy',
        shipping_info: 'Free express shipping',
        warranty_info: '2 years warranty',
        dimension: { width: 0.5, height: 0.5, depth: 0.3 }
    },
    {
        title: 'Wireless Phone Charger',
        description: 'Fast wireless charging pad compatible with all Qi-enabled devices. Sleek design.',
        price: 29.99,
        rating: 4.4,
        thumbnail: 'https://images.unsplash.com/photo-1591290619762-0d4c6b7fb6dd?w=500',
        images: ['https://images.unsplash.com/photo-1591290619762-0d4c6b7fb6dd?w=800'],
        category: 'mobile-accessories',
        stock: 250,
        brand: 'Anker',
        return_policy: '30 days return policy',
        shipping_info: 'Standard shipping',
        warranty_info: '18 months warranty',
        dimension: { width: 4.0, height: 4.0, depth: 0.4 }
    },
    {
        title: 'Phone Case with Card Holder',
        description: 'Protective phone case with built-in card holder. Available for multiple phone models.',
        price: 24.99,
        rating: 4.5,
        thumbnail: 'https://images.unsplash.com/photo-1601784551446-20c9e07cdbdb?w=500',
        images: ['https://images.unsplash.com/photo-1601784551446-20c9e07cdbdb?w=800'],
        category: 'mobile-accessories',
        stock: 300,
        brand: 'Spigen',
        return_policy: '30 days return policy',
        shipping_info: 'Free shipping on orders over $25',
        warranty_info: '1 year warranty',
        dimension: { width: 3.0, height: 6.0, depth: 0.5 }
    },
    {
        title: 'Modern Floor Lamp',
        description: 'Stylish floor lamp with adjustable brightness. Perfect for living room or bedroom.',
        price: 129.99,
        rating: 4.6,
        thumbnail: 'https://images.unsplash.com/photo-1507473885765-e6ed057f782c?w=500',
        images: ['https://images.unsplash.com/photo-1507473885765-e6ed057f782c?w=800'],
        category: 'furniture',
        stock: 40,
        brand: 'IKEA',
        return_policy: '90 days return policy',
        shipping_info: 'Standard shipping 7-10 days',
        warranty_info: '2 years warranty',
        dimension: { width: 12.0, height: 60.0, depth: 12.0 }
    },
    {
        title: 'Ergonomic Office Chair',
        description: 'Comfortable office chair with lumbar support and adjustable height. Perfect for long work hours.',
        price: 299.99,
        rating: 4.7,
        thumbnail: 'https://images.unsplash.com/photo-1580480055273-228ff5388ef8?w=500',
        images: ['https://images.unsplash.com/photo-1580480055273-228ff5388ef8?w=800'],
        category: 'furniture',
        stock: 55,
        brand: 'Herman Miller',
        return_policy: '30 days return policy',
        shipping_info: 'Free shipping',
        warranty_info: '5 years warranty',
        dimension: { width: 26.0, height: 42.0, depth: 26.0 }
    },
    {
        title: 'Stainless Steel Kitchen Knife Set',
        description: 'Professional 8-piece knife set with wooden block. Sharp and durable.',
        price: 149.99,
        rating: 4.8,
        thumbnail: 'https://images.unsplash.com/photo-1593618998160-e34014e67546?w=500',
        images: ['https://images.unsplash.com/photo-1593618998160-e34014e67546?w=800'],
        category: 'kitchen-accessories',
        stock: 80,
        brand: 'Wusthof',
        return_policy: '60 days return policy',
        shipping_info: 'Free shipping',
        warranty_info: 'Lifetime warranty',
        dimension: { width: 10.0, height: 15.0, depth: 6.0 }
    },
    {
        title: 'Non-Stick Cookware Set',
        description: '10-piece non-stick cookware set. Oven safe and dishwasher friendly.',
        price: 199.99,
        rating: 4.6,
        thumbnail: 'https://images.unsplash.com/photo-1584990347449-39b0e5d8f419?w=500',
        images: ['https://images.unsplash.com/photo-1584990347449-39b0e5d8f419?w=800'],
        category: 'kitchen-accessories',
        stock: 65,
        brand: 'T-fal',
        return_policy: '30 days return policy',
        shipping_info: 'Standard shipping',
        warranty_info: '2 years warranty',
        dimension: { width: 18.0, height: 10.0, depth: 18.0 }
    }
];

export async function seedProducts() {
    try {
        console.log('🌱 Starting database seed...');

        // Initialize database connection if not already connected
        if (!AppDataSource.isInitialized) {
            await AppDataSource.initialize();
            console.log('✅ Database connection established');
        }

        const productRepository = AppDataSource.getRepository(Product);

        // Check if products already exist
        const existingCount = await productRepository.count();
        if (existingCount > 0) {
            console.log(`⚠️  Database already has ${existingCount} products. Skipping seed.`);
            return;
        }

        // Insert products
        console.log(`📦 Inserting ${products.length} products...`);
        
        for (const productData of products) {
            const product = productRepository.create(productData as any);
            await productRepository.save(product);
        }

        console.log(`✅ Successfully seeded ${products.length} products!`);
        
        // Display summary
        const categories = [...new Set(products.map(p => p.category))];
        console.log(`📊 Categories: ${categories.join(', ')}`);
        
    } catch (error) {
        console.error('❌ Error seeding database:', error);
        throw error;
    } finally {
        if (AppDataSource.isInitialized) {
            await AppDataSource.destroy();
        }
    }
}

// Run seed if this file is executed directly
if (require.main === module) {
    seedProducts()
        .then(() => {
            console.log('🎉 Seed completed successfully');
            process.exit(0);
        })
        .catch((error) => {
            console.error('💥 Seed failed:', error);
            process.exit(1);
        });
}
