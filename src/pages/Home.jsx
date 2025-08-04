import { createResource } from "solid-js";
import { A } from "@solidjs/router";
import { resolvePath } from '../utils/resolvePath';

import Card from "../components/Card";

const fetchProducts = async () => {
  let url

  if (import.meta.env.DEV) {
    // 本地开发环境，使用 json-server
    url = 'http://localhost:4000/products'
  } else {
    // 部署环境，使用静态 JSON 文件
    url = import.meta.env.BASE_URL + '/data/db.json'
  }

  const res = await fetch(url)
  const data = await res.json()

  return import.meta.env.DEV ? data : data.products
}

export default function Home() {
  const [products] = createResource(fetchProducts)

  return (
    <Show when={products()} fallback={<p>Loading...</p>}>
      <div class="grid grid-cols-4 gap-10 my-4">
        <For each={products()}>
          {(product) => (
            <Card rounded={true} flat={true}>
              <img src={product.img} alt="product image" />
              <h1 class="my-3 font-bold">{product.title}</h1>
              <A href={resolvePath(`product/${product.id}`)} class="btn">View Product</A>
            </Card>
          )}
        </For>
      </div>
    </Show>
  )
}