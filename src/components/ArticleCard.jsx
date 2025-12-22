import { Calendar } from "lucide-react";
import { extractTextFromHTML } from "../utils/extractText";

const ArticleCard = ({ article }) => {
  const previewText =
    article.excerpt ||
    extractTextFromHTML(article.content, 140);

  return (
    <article className="bg-white rounded-2xl overflow-hidden shadow-sm hover:shadow-lg transition">
      <img
        src={article.gambar_url}
        alt={article.judul}
        className="h-48 w-full object-cover"
      />

      <div className="p-5 flex flex-col gap-3">
        <h3 className="font-bold text-lg leading-snug line-clamp-2">
          {article.judul}
        </h3>

        <p className="text-sm text-gray-600 line-clamp-3">
          {previewText}
        </p>

        <div className="flex items-center gap-2 text-xs text-gray-400 mt-auto">
          <Calendar size={14} />
          {new Date(article.tanggal_terbit).toLocaleDateString("id-ID")}
        </div>
      </div>
    </article>
  );
};

export default ArticleCard;
