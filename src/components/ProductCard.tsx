import { Link } from "@tanstack/react-router";
import { motion } from "framer-motion";
import { useCart } from "@/lib/cart";
import { formatPrice, type Product } from "@/lib/products";

export function ProductCard({ product }: { product: Product }) {
  const { add } = useCart();
  return (
    <motion.div
      whileHover={{ y: -6 }}
      transition={{ type: "spring", stiffness: 200, damping: 20 }}
      className="group relative overflow-hidden rounded-sm border border-border/60 bg-charcoal/40"
    >
      <Link to="/product/$id" params={{ id: product.id }} className="block">
        <div className="relative aspect-[4/5] overflow-hidden bg-onyx">
          <img
            src={product.image}
            alt={product.name}
            className="h-full w-full object-cover opacity-90 transition-all duration-1000 group-hover:scale-110 group-hover:opacity-100"
            loading="lazy"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-onyx via-transparent to-transparent opacity-80" />
          {product.isNew && (
            <span className="absolute left-4 top-4 border border-gold/40 bg-onyx/70 px-2 py-1 text-[9px] tracking-[0.3em] text-gold">
              NEW
            </span>
          )}
          {product.isLimited && (
            <span className="absolute right-4 top-4 border border-gold/40 bg-onyx/70 px-2 py-1 text-[9px] tracking-[0.3em] text-gold">
              LIMITED
            </span>
          )}
        </div>
        <div className="p-5">
          <div className="text-[10px] tracking-[0.3em] text-muted-foreground">{product.collection.toUpperCase()}</div>
          <div className="mt-1 font-display text-xl text-foreground">{product.name}</div>
          <div className="mt-1 line-clamp-1 text-xs text-muted-foreground">{product.shortDescription}</div>
          <div className="mt-4 flex items-center justify-between">
            <div className="text-gold-gradient font-display text-lg">{formatPrice(product.price)}</div>
            <div className="text-[10px] tracking-[0.3em] text-muted-foreground transition group-hover:text-gold">
              VIEW →
            </div>
          </div>
        </div>
      </Link>
      <button
        onClick={() => add(product.id)}
        className="absolute inset-x-5 bottom-5 translate-y-14 rounded-sm bg-gold-gradient py-2 text-[10px] font-semibold tracking-[0.3em] text-onyx opacity-0 transition-all duration-500 group-hover:translate-y-0 group-hover:opacity-100"
      >
        ADD TO CART
      </button>
    </motion.div>
  );
}
