import { useCallback, useEffect, useRef, useState } from "react";
import { Api } from "../utils/apis/Api";
import { ListForm } from "../types/List";

export default function useMetaDetail(id: string | undefined) {
  const [data, setData] = useState<ListForm>();
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");
  const latestRequest = useRef(0);
  const requestedLevel = useRef<number>();

  const loadMeta = useCallback(
    async (level?: number) => {
      if (!id) return;
      latestRequest.current += 1;
      const requestId = latestRequest.current;
      requestedLevel.current = level;
      setIsLoading(true);
      setError("");

      try {
        const response = await Api({
          bodyData: level === undefined ? { data: id } : { data: id, level },
          method: "POST",
          lastUrl: "meta/metasearch/",
        });
        if (requestId !== latestRequest.current) return;
        const result: ListForm | undefined =
          response?.resultcode === "SUCCESS" ? response.data?.[0] : undefined;
        if (!result?.meta) throw new Error("배치 조회 실패");
        setData(result);
      } catch {
        if (requestId === latestRequest.current) {
          setError("배치를 불러오지 못했습니다. 다시 시도해주세요.");
        }
      } finally {
        if (requestId === latestRequest.current) setIsLoading(false);
      }
    },
    [id],
  );

  useEffect(() => {
    setData(undefined);
    loadMeta();
    return () => {
      // Ignore responses from a previous detail page or an unmounted page.
      latestRequest.current += 1;
    };
  }, [loadMeta]);

  const selectedLevel =
    data?.selected_level ?? data?.meta.default_level ?? data?.meta.reroll_lv;
  const availableLevels =
    data?.available_levels ?? (selectedLevel ? [selectedLevel] : []);
  const recommendedLevel = data?.meta.default_level ?? selectedLevel;

  const selectLevel = (level: number) => {
    if (
      isLoading ||
      !availableLevels.includes(level) ||
      level === selectedLevel
    ) {
      return;
    }
    loadMeta(level);
  };

  return {
    data,
    isLoading,
    error,
    selectedLevel,
    availableLevels,
    recommendedLevel,
    selectLevel,
    retry: () => loadMeta(requestedLevel.current),
  };
}
