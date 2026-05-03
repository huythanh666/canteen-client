import { useFetcher } from "react-router-dom";
import { useState, useRef, useEffect } from "react";

function CreateProductForm() {
  const fetcher = useFetcher();
  const formRef = useRef(null);
  const [preview, setPreview] = useState(null);
  const isSubmitting = fetcher.state === "submitting";
  useEffect(() => {
    if (fetcher.data?.success) {
      formRef.current.reset();
      setPreview(null);
    }
  }, [fetcher.data]);

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file) setPreview(URL.createObjectURL(file));
  };
  return (
    <fetcher.Form
      ref={formRef}
      method="post"
      encType="multipart/form-data"
      className="space-y-4"
    >
      <input type="hidden" name="intent" value="CREATE_PRODUCT" />
      <div>
        <label className="block text-xs font-bold text-slate-400 uppercase mb-1">
          Tên sản phẩm
        </label>
        <input
          name="product_name"
          required
          className="w-full p-3 bg-slate-50 rounded-xl border border-slate-200 outline-none focus:ring-2 focus:ring-blue-500"
          placeholder="VD: Cà phê sữa"
        />
      </div>
      <div>
        <label className="block text-xs font-bold text-slate-400 uppercase mb-1">
          Loại
        </label>
        <select
          name="category"
          required
          className="w-full p-3 bg-slate-50 rounded-xl border border-slate-200 outline-none"
        >
          <option value="FOOD">FOOD</option>
          <option value="DRINK">DRINK</option>
        </select>
      </div>
      <div className="grid grid-cols-2 gap-4">
        <div>
          <label className="block text-xs font-bold text-slate-400 uppercase mb-1">
            Đơn vị
          </label>
          <input
            name="unit"
            required
            className="w-full p-3 bg-slate-50 rounded-xl border border-slate-200"
            placeholder="ly, cái..."
          />
        </div>
        <div>
          <label className="block text-xs font-bold text-slate-400 uppercase mb-1">
            Giá
          </label>
          <input
            name="price"
            type="number"
            className="w-full p-3 bg-slate-50 rounded-xl border border-slate-200"
            placeholder="0"
          />
        </div>
      </div>
      <div className="grid grid-cols-3 gap-2">
        <input
          name="calo"
          type="number"
          placeholder="Calo"
          className="p-3 bg-slate-50 rounded-xl border border-slate-200"
        />
        <input
          name="fat"
          type="number"
          placeholder="Fat"
          className="p-3 bg-slate-50 rounded-xl border border-slate-200"
        />
        <input
          name="protein"
          type="number"
          placeholder="Protein"
          className="p-3 bg-slate-50 rounded-xl border border-slate-200"
        />
      </div>
      <div className="pt-2">
        <label className="block text-xs font-bold text-slate-400 uppercase mb-1">
          Ảnh sản phẩm
        </label>
        <div className="flex items-center gap-4">
          <input
            name="image"
            type="file"
            accept="image/*"
            onChange={handleFileChange}
            className="w-full text-sm text-slate-500 file:mr-4 file:py-2 file:px-4 file:rounded-xl file:border-0 file:bg-blue-50 file:text-blue-700 hover:file:bg-blue-100"
          />
          {preview && (
            <img
              src={preview}
              alt="preview"
              className="w-12 h-12 object-cover rounded-lg border shadow-sm"
            />
          )}
        </div>
      </div>
      <button
        type="submit"
        disabled={isSubmitting}
        className={`w-full py-3 rounded-xl font-bold text-white transition-all ${
          isSubmitting
            ? "bg-blue-300 cursor-not-allowed"
            : "bg-blue-600 hover:bg-blue-700"
        }`}
      >
        {isSubmitting ? "Đang xử lý..." : "Tạo sản phẩm"}
      </button>
    </fetcher.Form>
  );
}

export default CreateProductForm;
