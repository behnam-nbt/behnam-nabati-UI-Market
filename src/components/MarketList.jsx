import { useEffect, useRef, useState } from 'react';

import useMarket from '../helpers/useMarket';

import { useInView } from 'react-intersection-observer';
import { motion, AnimatePresence } from 'framer-motion';

import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';
import 'swiper/css/pagination';
import { Autoplay, Pagination, Navigation } from 'swiper/modules';

import { FaChartLine } from 'react-icons/fa';
import { SlFire } from 'react-icons/sl';
import { CiStar } from 'react-icons/ci';
import { MdOutlineNavigateNext, MdOutlineNavigateBefore } from 'react-icons/md';

// Format price with sub-decimal styled
const formatSubZero = (price) => {
    const [whole, decimal] = price.toString().split('.');
    return (
        <span>
            ${whole}
            {decimal && (
                <>
                    .<span className="text-xs">{decimal}</span>
                </>
            )}
        </span>
    );
};
// Section card titles with associated icons
const cardTitles = [
    { title: 'Hot List', icon: <SlFire className="text-purple-300" /> },
    { title: 'New Coins', icon: <CiStar className="text-purple-300" /> },
    { title: 'Top Gainers', icon: <FaChartLine className="text-purple-300" /> },
];

function MarketList() {
    const { markets, loading, error } = useMarket(); // Custom hook to fetch market data
    const { ref, inView } = useInView({ triggerOnce: true, threshold: 0.3 }); // Track visibility to trigger animation
    const [showContent, setShowContent] = useState(false); // UI state
    const [hoveredCoinId, setHoveredCoinId] = useState(null); // UI state
    const swiperRef = useRef(null); // Reference to Swiper instance

    // Re-assign custom navigation elements to Swiper after mount
    useEffect(() => {
        if (
            swiperRef.current &&
            swiperRef.current.swiper?.params?.navigation
        ) {
            const swiper = swiperRef.current.swiper;
            swiper.params.navigation.prevEl = '.custom-prev';
            swiper.params.navigation.nextEl = '.custom-next';
            swiper.navigation.destroy();
            swiper.navigation.init();
            swiper.navigation.update();
        }
    }, []);

    // Trigger content reveal when in view
    useEffect(() => {
        if (inView) {
            const timer = setTimeout(() => setShowContent(true), 1200);
            return () => clearTimeout(timer);
        }
    }, [inView]);

    // Display loading or error states
    if (loading) return <div className="text-white">Loading markets...</div>;
    if (error) return <div className="text-red-400">{error}</div>;

    // Split markets into chunks of 5 for Swiper slides
    const chunks = [0, 5, 10].map((start) => markets.slice(start, start + 5));

    return (
        <div className="max-sm:px-3 min-md:w-2/3 min-[1537px]:w-2/4 mx-auto m-6 relative" ref={ref}>
            <Swiper
                ref={swiperRef}
                modules={[Autoplay, Pagination, Navigation]}
                spaceBetween={20}
                slidesPerView={1}
                pagination={{ clickable: true, el: '.custom-pagination' }}
                navigation={{ nextEl: '.custom-next', prevEl: '.custom-prev' }}
                autoplay={{ delay: 5000 }}
                breakpoints={{
                    320: { slidesPerView: 1 },
                    768: { slidesPerView: 2 },
                    1024: { slidesPerView: 3 },
                }}
            >
                {chunks.map((group, idx) => (
                    <SwiperSlide key={idx}>
                        <div className="bg-neutral-900 py-2 rounded-xl shadow-lg w-full h-full">
                            <div className="w-fit m-4 px-2 flex items-center justify-center gap-1 mb-4 bg-neutral-950 rounded-full">
                                {cardTitles[idx]?.icon}
                                <h3 className="text-sm font-semibold text-purple-400">{cardTitles[idx]?.title}</h3>
                            </div>
                            <div className="mt-8">
                                <AnimatePresence>
                                    {showContent ? (
                                        // Render actual coin data with animation
                                        group.map((coin) => (
                                            <motion.div
                                                key={coin.id}
                                                layout
                                                onMouseEnter={() => setHoveredCoinId(coin.id)}
                                                onMouseLeave={() => setHoveredCoinId(null)}
                                                initial={{ opacity: 0, y: 10 }}
                                                animate={{ opacity: 1, y: 0 }}
                                                exit={{ opacity: 0, y: 10 }}
                                                transition={{ duration: 0.3 }}
                                                className="flex justify-between items-center mb-8 hover:bg-slate-950 py-2 px-4 relative"
                                            >
                                                {/* Exchange button appears on hover */}
                                                {hoveredCoinId === coin.id && (
                                                    <motion.button
                                                        initial={{ opacity: 0, x: 10 }}
                                                        animate={{ opacity: 1, x: 0 }}
                                                        exit={{ opacity: 0, x: 10 }}
                                                        transition={{ duration: 0.2 }}
                                                        className="w-5 h-auto absolute right-0 top-0 -translate-y-1/2 cursor-pointer"
                                                    >
                                                        <img src="/images/exchange.png" alt={`${coin.name} exchange`} />
                                                    </motion.button>
                                                )}
                                                {/* Coin Logo and Name */}
                                                <div className="flex items-center">
                                                    <img className="w-8 h-auto mr-2" src={coin.image} alt={coin.name} />
                                                    <p className="text-white text-xs">
                                                        {coin.symbol}{' '}
                                                        <span className="text-gray-400">({coin.name})</span>
                                                    </p>
                                                </div>
                                                {/* Price and Change */}
                                                <div className="text-right">
                                                    <p className="text-xs">{formatSubZero(coin.price)}</p>
                                                    <p
                                                        className={`font-medium text-xs ${coin.priceChangePercent >= 0 ? 'text-green-400' : 'text-red-400'
                                                            }`}
                                                    >
                                                        ({coin.priceChangePercent}%)
                                                    </p>
                                                </div>
                                            </motion.div>
                                        ))
                                    ) : (
                                        // Skeleton loading placeholder
                                        Array(5)
                                            .fill(0)
                                            .map((_, i) => (
                                                <div
                                                    key={i}
                                                    className="flex justify-between items-center border border-zinc-800 rounded-lg px-3 py-2 bg-zinc-800"
                                                >
                                                    <div className="flex items-center">
                                                        <div className="w-[40px] h-[40px] bg-zinc-700 animate-pulse rounded-full" />
                                                        <div className="w-[100px] h-8 bg-zinc-700 animate-pulse rounded ml-2" />
                                                    </div>
                                                    <div className="w-1/4 h-8 bg-zinc-700 animate-pulse rounded" />
                                                </div>
                                            ))
                                    )}
                                </AnimatePresence>
                            </div>
                        </div>
                    </SwiperSlide>
                ))}
            </Swiper>

            {/* Navigation Buttons */}
            <button className="custom-prev absolute top-1/2 left-0 -translate-y-1/2 z-10 p-2 bg-neutral-600 hover:bg-neutral-700 rounded-full shadow-lg block lg:hidden">
                <MdOutlineNavigateBefore />
            </button>
            <button className="custom-next absolute top-1/2 right-0 -translate-y-1/2 z-10 p-2 bg-neutral-600 hover:bg-neutral-700 rounded-full shadow-lg block lg:hidden">
                <MdOutlineNavigateNext />
            </button>

            {/* Pagination */}
            <div className="custom-pagination flex justify-center mt-4" />
        </div>
    );
}

export default MarketList;
