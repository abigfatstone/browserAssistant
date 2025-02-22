(async () => {
  const getPageContent = () => {
    return document.body.innerText;
  };

  const summarizePage = async (content) => {
    try {
      // 预处理文本，保留更多有价值的内容
      let processedContent = content
        .replace(/<[^>]*>/g, '') // 移除HTML标签
        .replace(/\s+/g, ' ')    // 规范化空白字符
        .trim();

      const response = await fetch('https://api.openai.com/v1/chat/completions', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${CONFIG.OPENAI_API_KEY}`
        },
        body: JSON.stringify({
          model: "gpt-3.5-turbo",
          messages: [
            {
              role: "system",
              content: "你是一个专业的文章摘要助手。请提供一个简洁但信息完整的摘要，突出文章的主要观点和关键信息。摘要应当保持文章的核心含义，同时便于读者快速理解。"
            },
            {
              role: "user",
              content: `请对以下内容生成一个清晰的摘要：\n\n${processedContent}`
            }
          ],
          temperature: 0.7,
          max_tokens: 500,
          presence_penalty: 0.3,
          frequency_penalty: 0.3
        })
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(JSON.stringify(errorData));
      }

      const data = await response.json();
      return data.choices[0].message.content.trim();
    } catch (error) {
      console.error('摘要生成失败:', error);
      return '生成摘要时发生错误，请稍后重试。';
    }
  };

  const content = getPageContent();
  const summary = await summarizePage(content);
  chrome.storage.local.set({ pageSummary: summary });
})();