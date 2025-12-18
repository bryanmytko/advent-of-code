guard :rspec, cmd: "bundle exec rspec", all_on_start: true, spec_paths: ["2025"] do
  watch(%r{^2025/*/spec/.*_spec\.rb$})
  watch(%r{^2025/(\d+)/\1\.rb$}) { |m| "2025/#{m[1]}/spec/#{m[1]}_spec.rb" }
end

