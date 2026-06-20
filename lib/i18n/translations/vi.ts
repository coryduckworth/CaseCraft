import type { Translations } from "./en";

export const vi: Translations = {
  meta: {
    title: "CaseCraft — Huấn luyện viên Tranh biện AI",
    description:
      "Không gian tranh biện và tư duy phản biện được hỗ trợ bởi AI, giúp học sinh biến ý tưởng thành bài luận sẵn sàng thi đấu.",
  },
  common: {
    cancel: "Hủy",
    create: "Tạo",
    generate: "Tạo",
    regenerate: "Tạo lại",
    reanalyze: "Phân tích lại",
    prefix: "Tiền tố",
    format: "Thể thức",
    score: "Điểm",
    vs: "vs",
  },
  language: {
    switch: "Ngôn ngữ",
  },
  dashboard: {
    tagline: "Giúp tôi suy nghĩ tốt hơn.",
    recentCases: "Vụ án Gần đây",
    welcomeTitle: "Chào mừng đến CaseCraft",
    welcomeDescription:
      "Huấn luyện viên tranh biện AI của bạn — không phải người viết hộ. Biến ý tưởng thành bài luận sẵn sàng thi đấu qua lập luận có cấu trúc.",
    steps: {
      analyze: {
        title: "Phân tích Đề bài",
        description: "Phân tích các bên, các nhóm liên quan và xung đột cốt lõi",
      },
      forge: {
        title: "Rèn Luận điểm",
        description: "Xây dựng luận điểm có cơ chế và tác động rõ ràng",
      },
      practice: {
        title: "Luyện tập & Phản tư",
        description: "Phản biện đối thủ và được chấm điểm kỹ năng",
      },
    },
    newMotion: "Đề bài Mới",
    newCaseTitle: "Bắt đầu Vụ án Mới",
    newCaseDescription:
      "Chọn thể thức tranh biện và nhập đề bài. Mỗi vụ án là một không gian huấn luyện cho thể thức đó.",
    debateFormat: "Thể thức Tranh biện",
    motion: "Đề bài",
    createCase: "Tạo Vụ án",
    generateMotion: "Tạo đề",
    motionTopic: "Chủ đề (tuỳ chọn)",
    motionTopicPlaceholder: "vd. công nghệ, đạo đức, môi trường",
    generating: "Đang tạo...",
    badges: {
      analyzed: "Đã phân tích",
      arguments: "Luận điểm",
      clashMap: "Bản đồ Xung đột",
      newCase: "Vụ án mới",
    },
    relativeTime: {
      justNow: "vừa xong",
      minutesAgo: "{n} phút trước",
      hoursAgo: "{n} giờ trước",
      daysAgo: "{n} ngày trước",
    },
  },
  case: {
    backToDashboard: "Về Bảng điều khiển",
    tabs: {
      analysis: "Phân tích",
      arguments: "Luận điểm",
      clash: "Xung đột",
      rebuttal: "Phản biện",
      judge: "Trọng tài",
      train: "Luyện tập",
    },
  },
  format: {
    wsdc: {
      description: "Giải Tranh biện Học sinh Thế giới",
      affirmativeLabel: "Chính phủ",
      negativeLabel: "Đối lập",
      motionPrefix: "THBT / THW / THR",
      motionPlaceholder:
        'vd. "THBT các trường đại học nên bãi bỏ điểm số"',
      evidenceApproach:
        "Nghiên cứu chuyên sâu — trích dẫn dữ liệu thực tế, nghiên cứu và ví dụ",
      prepSpeechCrystal:
        "Chuẩn bị {prep} · Bài phát biểu {speech}, tổng kết {crystal}",
      prepSpeechNoCrystal:
        "Chuẩn bị {prep} · Bài phát biểu {speech}, không có tổng kết",
    },
    wsc: {
      description: "World Scholar's Cup",
      affirmativeLabel: "Ủng hộ",
      negativeLabel: "Phản đối",
      motionPrefix: "That",
      motionPlaceholder:
        'vd. "That social media does more harm than good"',
      evidenceApproach:
        "Chương trình WSC — khai thác chủ đề Scholar's Bowl và kiến thức liên ngành",
      prepSpeechCrystal:
        "Chuẩn bị {prep} · Bài phát biểu {speech}, tổng kết {crystal}",
      prepSpeechNoCrystal:
        "Chuẩn bị {prep} · Bài phát biểu {speech}, không có tổng kết",
    },
  },
  analysis: {
    title: "Phân tích Đề bài",
    description:
      "Phân tích đề bài thành các bên, nhóm liên quan và xung đột cốt lõi",
    descriptionWsc: " — nhấn mạnh cách hiểu đề bài",
    analyzeMotion: "Phân tích Đề bài",
    actor: "Bên hành động",
    action: "Hành động",
    stakeholders: "Các nhóm liên quan",
    coreClash: "Xung đột Cốt lõi",
    context: "Bối cảnh",
    empty: 'Nhấn "Phân tích Đề bài" để phân tích đề tranh biện này',
  },
  arguments: {
    title: "Rèn Luận điểm",
    description: "Xây dựng luận điểm có cấu trúc — luận điểm, cơ chế, tác động",
    empty: "Chọn phe và nhấn Tạo để rèn luận điểm có cấu trúc",
    argumentN: "Luận điểm {n}",
    claim: "Luận điểm",
    mechanism: "Cơ chế",
    impact: "Tác động",
    likelihood: "Khả năng",
    importance: "Mức độ quan trọng",
  },
  clash: {
    title: "Bản đồ Xung đột",
    description: "Hình dung nơi cuộc tranh biện thực sự diễn ra",
    generateMap: "Tạo Bản đồ",
    mainClash: "Xung đột Chính",
    empty:
      "Tạo bản đồ xung đột để xem Chính phủ và Đối lập va chạm ở đâu",
    emptyWsc:
      "Tạo bản đồ xung đột để xem phe Ủng hộ và Phản đối va chạm ở đâu",
  },
  rebuttal: {
    title: "Đấu trường Phản biện",
    description:
      "Nhập luận điểm đối thủ và nhận hướng dẫn về các cách phản biện",
    yourSide: "Phe của bạn:",
    placeholder:
      "Dán luận điểm đối thủ vào đây... vd. 'Điểm số giúp nhà tuyển dụng tìm nhân tài.'",
    getCoaching: "Nhận Hướng dẫn",
    possibleResponses: "Các Cách Phản biện",
    pastSessions: "Phiên Trước",
    responseN: "Phản biện {n}",
    responsesCount: "{n} phản biện",
    hideExplanation: "Ẩn giải thích",
    whyThisWorks: "Tại sao cách này hiệu quả?",
    empty: "Nhập luận điểm đối thủ để luyện phản biện",
    types: {
      turn: "Đảo ngược",
      takeout: "Bác bỏ",
      weighing: "Cân trọng",
      extension: "Mở rộng",
    },
  },
  judge: {
    title: "Mô phỏng Trọng tài",
    descriptionWsc:
      "Nộp bài phát biểu WSC {speech} của bạn (sau {prep} chuẩn bị)",
    descriptionWsdc:
      "Nộp bài WSDC — xây dựng {speech}, tổng kết {crystal}",
    speech: "Bài phát biểu ({time})",
    constructive: "Xây dựng ({time})",
    rebuttal: "Phản biện",
    crystallization: "Tổng kết ({time})",
    placeholderWsc: "Bài phát biểu tranh biện WSC 4 phút của bạn...",
    placeholderConstructive: "Bài phát biểu xây dựng 8 phút của bạn...",
    placeholderRebuttal: "Bài phát biểu phản biện của bạn...",
    placeholderCrystallization: "Bài tổng kết / reply 4 phút của bạn...",
    judgeMySpeech: "Chấm Bài của tôi",
    empty: "Nộp bài phát biểu để được chấm kỹ năng tranh biện",
    review: "Nhận xét",
    strengths: "Làm tốt điều gì",
    fixes: "Cần sửa gì",
    principles: "Nguyên tắc tranh biện",
    skillBreakdown: "Phân tích Kỹ năng",
    showDetailed: "Xem phản hồi chi tiết",
    hideDetailed: "Ẩn phản hồi chi tiết",
    detailedTitle: "Phản hồi chi tiết",
    skills: {
      logic: "Logic",
      rebuttal: "Phản biện",
      weighing: "Cân trọng",
      analysis: "Phân tích",
      evidence: "Bằng chứng",
    },
  },
  ratings: {
    High: "Cao",
    Medium: "Trung bình",
    Low: "Thấp",
  },
  toasts: {
    motionAnalyzed: "Phân tích đề bài thành công",
    argumentsGenerated: "Đã tạo luận điểm phe {side}",
    clashMapGenerated: "Đã tạo bản đồ xung đột",
    rebuttalReady: "Hướng dẫn phản biện sẵn sàng",
    speechJudged: "Đã chấm bài phát biểu",
    enterOpponentArgument: "Hãy nhập luận điểm đối thủ trước",
    enterSpeechSection: "Hãy nhập ít nhất một phần bài phát biểu để chấm",
    motionGenerated: "Đã tạo đề bài",
  },
  errors: {
    analyzeMotion: "Không thể phân tích đề bài",
    generateArguments: "Không thể tạo luận điểm",
    generateClashMap: "Không thể tạo bản đồ xung đột",
    generateRebuttals: "Không thể tạo phản biện",
    judgeSpeech: "Không thể chấm bài phát biểu",
    coach: "Không thể nhận hướng dẫn",
    generateMotion: "Không thể tạo đề bài",
  },
  train: {
    badge: "Luyện tập",
    setup: {
      title: "Luyện theo vai diễn giả",
      subtitle:
        "Chọn phe và vai diễn giả bạn theo. Bạn sẽ làm bài tập từng bước — bạn viết, huấn luyện viên phản hồi, bạn chỉnh sửa.",
      chooseSide: "Bạn thuộc phe nào?",
      chooseRole: "Bạn theo diễn giả nào?",
      comingSoon: "Sắp ra mắt",
      start: "Bắt đầu Luyện tập",
      roles: {
        first: {
          label: "Diễn giả 1",
          blurb: "Khung sườn: hiểu đề, đánh đổi, nhóm liên quan, cơ chế.",
        },
        second: {
          label: "Diễn giả 2",
          blurb: "Luận điểm, lập luận, bằng chứng và phản biện.",
        },
        third: {
          label: "Diễn giả 3",
          blurb: "Xung đột, phản-phản biện và cân trọng.",
        },
      },
    },
    overview: {
      title: "Lộ trình luyện tập",
      role: "Vai",
      side: "Phe",
      progressLabel: "{completed} / {total} bài tập",
      skillGrowth: "Tiến bộ Kỹ năng",
      skillGrowthEmpty: "Hoàn thành bài tập để thấy kỹ năng tiến bộ.",
    },
    stepper: {
      lockedHint: "Hoàn thành bước trước để mở khoá bước này.",
      bestScore: "Cao nhất {score}",
      locked: "Đã khoá",
      inProgress: "Đang làm",
      complete: "Hoàn thành",
    },
    panel: {
      submit: "Nhận Hướng dẫn",
      resubmit: "Sửa & Nộp lại",
      markComplete: "Đánh dấu hoàn thành",
      continueNext: "Tiếp tục",
      history: "Các lần thử trước",
      attemptN: "Lần {n}",
      blankGuard: "Hãy điền câu trả lời trước khi nhận hướng dẫn.",
    },
    feedback: {
      score: "Điểm",
      checklist: "Danh sách kiểm",
      strengths: "Điểm tốt",
      fixes: "Cần sửa",
      coaching: "Huấn luyện viên",
      passed: "Đạt — làm tốt lắm!",
      keepRefining: "Tiếp tục chỉnh sửa và nộp lại.",
    },
    skills: {
      analysis: "Phân tích",
      logic: "Logic",
      weighing: "Cân trọng",
      rebuttal: "Phản biện",
      evidence: "Bằng chứng",
    },
    toasts: {
      started: "Đã bắt đầu luyện tập — bắt đầu thôi!",
      scored: "Phản hồi đã sẵn sàng",
      complete: "Hoàn thành bài tập!",
    },
    exercises: {
      interpretation: {
        title: "Hiểu Đề bài",
        blurb: "Định nghĩa thuật ngữ, nêu gánh nặng và giới hạn tranh luận.",
        fields: {
          defendThis: {
            label: "Phe bạn phải chứng minh điều gì?",
            placeholder: "Với đề này, phe mình phải cho thấy rằng...",
          },
          keyTerms: {
            label: "Định nghĩa thuật ngữ chính",
            placeholder: "Khi nói '...' chúng tôi nghĩa là...",
          },
          scope: {
            label: "Phạm vi — gồm gì và không gồm gì?",
            placeholder: "Cuộc tranh luận này về... KHÔNG phải về...",
          },
        },
        criteria: {
          termsDefined: "Thuật ngữ chính được định nghĩa rõ",
          burdenCorrect: "Nêu được điều phe mình phải chứng minh",
          scopeBounded: "Giới hạn rõ trong và ngoài phạm vi",
        },
      },
      tradeoff: {
        title: "Định khung Đánh đổi",
        blurb:
          "Nêu điều phe bạn tối ưu sau cùng và đánh đổi mà phe chấp nhận để đạt được.",
        fields: {
          ultimateGoal: {
            label: "Mục tiêu tối thượng của phe bạn",
            placeholder: "Trên hết, phe mình bảo vệ / tối đa hoá...",
          },
          tradeoff: {
            label: "Đánh đổi mà bạn chấp nhận",
            placeholder: "Chúng tôi ưu tiên ... dù phải đánh đổi ...",
          },
        },
        criteria: {
          goalMatchesSide: "Mục tiêu hợp với phe bạn",
          tradeoffIsRealTension: "Đánh đổi thực sự (được gì vs mất gì)",
          notVague: "Cụ thể, không chung chung",
        },
      },
      stakeholders: {
        title: "Xây dựng Nhóm liên quan",
        blurb:
          "Chọn một nhóm bị đề bài ảnh hưởng và mô tả đặc điểm khiến họ quan trọng.",
        fields: {
          stakeholder: {
            label: "Nhóm liên quan",
            placeholder: "vd. sinh viên thế hệ đầu vào đại học",
          },
          traits: {
            label: "Đặc điểm — vì sao họ quan trọng ở đây?",
            placeholder: "Họ là... nên đề bài ảnh hưởng họ bằng cách...",
          },
        },
        criteria: {
          isGroupNotActor: "Là nhóm bị ảnh hưởng, không phải bên hành động",
          traitsExplainStake: "Đặc điểm giải thích vì sao họ quan trọng",
          relevantToMotion: "Liên quan đến đề bài này",
        },
      },
      mechanism: {
        title: "Xây dựng Cơ chế",
        blurb:
          "Biến luận điểm thành chuỗi nhân-quả dẫn tới tác động cụ thể.",
        fields: {
          claim: {
            label: "Luận điểm (một câu)",
            placeholder: "Phe mình tin rằng...",
          },
          mechanism: {
            label: "Cơ chế (điều đó xảy ra thế nào?)",
            placeholder: "Vì..., người ta..., dẫn đến...",
          },
          impact: {
            label: "Tác động (kết quả thực tế)",
            placeholder: "Kết quả là, trong thực tế...",
          },
        },
        criteria: {
          mechanismDiffersFromClaim: "Cơ chế giải thích cách, không lặp luận điểm",
          causalChainPresent: "Chuỗi nhân-quả rõ ràng",
          impactConcrete: "Tác động thực tế cụ thể",
        },
      },
    },
  },
};
