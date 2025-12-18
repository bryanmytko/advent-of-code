guard :rspec, cmd: "bundle exec rspec", all_on_start: true, spec_paths: ["2025"] do
  watch(%r{^2025/(\d+)/spec/\1_spec\.rb$}) { |m| m[0] }
  watch(%r{^2025/(\d+)/\1\.rb$}) { |m| "2025/#{m[1]}/spec/#{m[1]}_spec.rb" }
end

