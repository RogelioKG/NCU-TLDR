BEGIN;

INSERT INTO colleges (id, name)
VALUES
  ('collegeI0', '中心、處室'),
  ('collegeI1', '文學院'),
  ('collegeI3', '工學院'),
  ('collegeI6', '地球科學學院'),
  ('collegeI7', '客家學院'),
  ('collegeI8', '生醫理工學院'),
  ('collegeI9', '永續與綠能科技研究學院'),
  ('collegeI2', '理學院'),
  ('collegeI4', '管理學院'),
  ('collegeI5', '資訊電機學院')
ON CONFLICT (id) DO UPDATE SET
  name = EXCLUDED.name;

COMMIT;
